import assert from "node:assert/strict";
import test from "node:test";
import {
  briefingFields,
  buildBriefingMessage,
  emptyBriefing,
  getBriefingWhatsAppUrl,
  getWebsitePaymentUrl,
  validateBriefing,
} from "../lib/website-briefing.ts";

const validBriefing = {
  ...emptyBriefing,
  company: "Estúdio Ação & Design",
  contact: "João da Silva",
  phone: "+55 (45) 99999-9999",
  email: "joao@example.com",
  segment: "Arquitetura",
  location: "Foz do Iguaçu, PR",
  about: "Projetos de arquitetura para famílias e negócios locais.",
  services: "Interiores\nProjetos comerciais",
  goal: "contact",
  domainStatus: "register",
  domain: "estudioacao.com.br",
};

test("validates each step independently and accepts a complete brief", () => {
  assert.deepEqual(validateBriefing(validBriefing), {});
  const errors = validateBriefing(emptyBriefing, 0);
  assert.equal(Object.keys(errors).length, 6);
  assert.equal(errors.about, undefined);
  assert.equal(validateBriefing(emptyBriefing, 1).about, "required");
});

test("rejects whitespace, invalid contacts, incomplete descriptions and unknown options", () => {
  const errors = validateBriefing({
    ...validBriefing,
    company: "   ",
    phone: "call 12345678900",
    email: "email@invalid",
    about: "Curto",
    services: "abc",
    goal: "unknown",
    style: "unknown",
    domainStatus: "unknown",
  });
  assert.deepEqual(errors, {
    company: "required",
    phone: "phone",
    email: "email",
    about: "about",
    services: "services",
    goal: "required",
    style: "required",
    domainStatus: "required",
  });
  for (const phone of ["123456789", "1234567890123456"]) {
    assert.equal(validateBriefing({ ...validBriefing, phone }).phone, "phone");
  }
});

test("enforces field limits and accepts their boundaries", () => {
  assert.equal(
    validateBriefing({
      ...validBriefing,
      notes: "a".repeat(briefingFields.notes.max),
    }).notes,
    undefined,
  );
  assert.equal(
    validateBriefing({
      ...validBriefing,
      notes: "a".repeat(briefingFields.notes.max + 1),
    }).notes,
    "length",
  );
});

test("preserves accents, line breaks and special characters in the WhatsApp URL", () => {
  const url = new URL(
    getBriefingWhatsAppUrl("+55 45 9855-3609", validBriefing),
  );
  assert.equal(url.origin, "https://wa.me");
  assert.equal(url.pathname, "/554598553609");
  assert.equal(
    url.searchParams.get("text"),
    buildBriefingMessage(validBriefing),
  );
  assert.match(url.searchParams.get("text"), /Estúdio Ação & Design/);
  assert.match(url.searchParams.get("text"), /Interiores\nProjetos comerciais/);
});

test("sends the offer, scope, consent and readable choices without empty optional fields", () => {
  const message = buildBriefingMessage(validBriefing);
  for (const text of [
    "R$ 300,00",
    "R$ 99,90/mês, sem reajuste",
    "48 horas",
    "segundo ano à parte",
    "sem e-commerce",
    "Autorizo",
    "Receber contatos pelo WhatsApp",
    "Quero registrar um domínio .br",
  ]) {
    assert.ok(message.includes(text), text);
  }
  assert.ok(!message.includes("*Observações:*"));
});

test("payment is unavailable for missing, malformed or unsafe URLs", () => {
  for (const value of [
    undefined,
    "",
    "   ",
    "/checkout",
    "invalid",
    "http://example.com",
    "javascript:alert(1)",
    "https://user:password@example.com",
  ]) {
    assert.equal(getWebsitePaymentUrl(value), null);
  }
  assert.equal(
    getWebsitePaymentUrl(" https://checkout.example.com/product?plan=nja "),
    "https://checkout.example.com/product?plan=nja",
  );
});
