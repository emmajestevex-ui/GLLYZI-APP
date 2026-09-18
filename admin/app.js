import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

const SUPABASE_URL = "https://qlfugpumolehqzzuvocn.supabase.co";
const SUPABASE_KEY = "sb_publishable_EAsMdYoIsenDI9ZYxKMcFA_3nuPXW5y";
const BUCKET = "greeg-content";
const SCRIPT_VERSION = "20260918-only-esp-ffth";
const DEFAULT_TARGET_BUNDLE = "com.dts.freefireth";
const FREE_FIRE_MAX_BUNDLE = "com.dts.freefiremax";
const ASSET_INDEXER_DIRECTORY = "Documents/contentcache/Compulsory/ios/gameassetbundles/avatar";
const ASSET_VARIANTS = {
  pen: {
    label: "Asset PEN - FF Max",
    targetBundle: FREE_FIRE_MAX_BUNDLE,
    targetPath: `${ASSET_INDEXER_DIRECTORY}/assetindexer.PENojQAQ-f9a1I6Dzjs0n1Z3rtVU~3D`,
  },
  h5: {
    label: "Asset U6 - FF Normal",
    targetBundle: DEFAULT_TARGET_BUNDLE,
    targetPath: `${ASSET_INDEXER_DIRECTORY}/assetindexer.U6Zffc4YIR3DslNj3cXvYGAqz58~3D`,
  },
};

const PATCH_PRESETS = [
  {
    key: "asset-indexer",
    name: "Asset Indexer",
    slug: "asset-indexer-ff-max",
    category: "patches",
    description: "Avatar asset bundle",
    targetBundle: FREE_FIRE_MAX_BUNDLE,
    rules: [
      {
        label: ASSET_VARIANTS.pen.label,
        slug: "asset-indexer-ff-max",
        category: "patches",
        description: "Avatar asset bundle for Free Fire Max",
        targetBundle: ASSET_VARIANTS.pen.targetBundle,
        targetPath: ASSET_VARIANTS.pen.targetPath,
        assetVariant: "pen",
      },
      {
        label: ASSET_VARIANTS.h5.label,
        slug: "asset-indexer",
        category: "patches",
        description: "Avatar asset bundle for Free Fire normal",
        targetBundle: ASSET_VARIANTS.h5.targetBundle,
        targetPath: ASSET_VARIANTS.h5.targetPath,
        assetVariant: "h5",
      },
    ],
  },
  {
    key: "shaders",
    name: "Shaders",
    slug: "shaders",
    category: "shaders",
    description: "Shader bundle",
    targetBundle: DEFAULT_TARGET_BUNDLE,
    rules: [
      {
        label: "Shaders - FF Normal",
        slug: "shaders",
        category: "shaders",
        description: "Shader bundle for Free Fire normal",
        targetBundle: DEFAULT_TARGET_BUNDLE,
        targetPath: "Documents/contentcache/Optional/ios/gameassetbundles/shaders.HPt9DZviTSXL9hpGW9QNOMigNLA~3D",
      },
      {
        label: "Shaders - FF Max",
        slug: "shaders-ff-max",
        category: "shaders",
        description: "Shader bundle for Free Fire Max",
        targetBundle: FREE_FIRE_MAX_BUNDLE,
        targetPath: "Documents/contentcache/Optional/ios/gameassetbundles/shaders.HPt9DZviTSXL9hpGW9QNOMigNLA~3D",
      },
    ],
  },
  {
    key: "fps-144",
    name: "144 fps",
    slug: "144-fps",
    category: "configs",
    description: "FPS preferences",
    targetBundle: DEFAULT_TARGET_BUNDLE,
    targetPath: "Library/Preferences/com.dts.freefireth.plist",
  },
  {
    key: "only-esp-ffth",
    name: "Only Esp FFTH",
    slug: "only-esp-ffth",
    category: "patches",
    description: "Only Esp patch for Free Fire TH",
    targetBundle: DEFAULT_TARGET_BUNDLE,
    rules: [
      {
        label: "Assembly-CSharp-patch.bytes",
        slug: "only-esp-ffth-assembly",
        category: "patches",
        description: "Assembly patch for Free Fire TH",
        targetBundle: DEFAULT_TARGET_BUNDLE,
        targetPath: "Documents/Assembly-CSharp-patch.bytes",
      },
      {
        label: "GameBand-Fix.json",
        slug: "only-esp-ffth-gameband",
        category: "configs",
        description: "GameBand fix for Free Fire TH",
        targetBundle: DEFAULT_TARGET_BUNDLE,
        targetPath: "Documents/GameBand-Fix.json",
      },
      {
        label: "localConfig.json",
        slug: "only-esp-ffth-config",
        category: "configs",
        description: "localConfig for Free Fire TH",
        targetBundle: DEFAULT_TARGET_BUNDLE,
        targetPath: "Documents/localConfig.json",
      },
    ],
  },
  {
    key: "aimbot-drag-ff-max",
    name: "Aimbot Drag FF Max",
    slug: "aimbot-drag-ff-max",
    category: "patches",
    description: "Patch with Assembly-CSharp-patch.bytes and localConfig.json",
    targetBundle: FREE_FIRE_MAX_BUNDLE,
    rules: [
      {
        label: "Assembly-CSharp-patch.bytes",
        slug: "aimbot-drag-ff-max-assembly",
        category: "patches",
        description: "Assembly patch for Free Fire Max",
        targetPath: "Documents/Assembly-CSharp-patch.bytes",
      },
      {
        label: "localConfig.json",
        slug: "aimbot-drag-ff-max-config",
        category: "configs",
        description: "localConfig.json for Free Fire Max",
        targetPath: "Documents/localConfig.json",
      },
    ],
  },
];

const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

window.__GREEG_ADMIN_READY = SCRIPT_VERSION;

const state = {
  files: [],
  session: null,
  busy: false,
};

const $ = (selector) => document.querySelector(selector);

const els = {
  loginPanel: $("#loginPanel"),
  adminPanel: $("#adminPanel"),
  loginForm: $("#loginForm"),
  loginStatus: $("#loginStatus"),
  emailInput: $("#emailInput"),
  passwordInput: $("#passwordInput"),
  createAccessButton: $("#createAccessButton"),
  resetPasswordButton: $("#resetPasswordButton"),
  signOutButton: $("#signOutButton"),
  sessionEmail: $("#sessionEmail"),
  fileForm: $("#fileForm"),
  formTitle: $("#formTitle"),
  editingId: $("#editingId"),
  nameInput: $("#nameInput"),
  slugInput: $("#slugInput"),
  categoryInput: $("#categoryInput"),
  targetBundleInput: $("#targetBundleInput"),
  assetVariantLabel: $("#assetVariantLabel"),
  assetVariantInput: $("#assetVariantInput"),
  targetPathInput: $("#targetPathInput"),
  descriptionInput: $("#descriptionInput"),
  fileInput: $("#fileInput"),
  saveButton: $("#saveButton"),
  newButton: $("#newButton"),
  refreshButton: $("#refreshButton"),
  publishButton: $("#publishButton"),
  searchInput: $("#searchInput"),
  presetList: $("#presetList"),
  fileCounter: $("#fileCounter"),
  statusText: $("#statusText"),
  fileList: $("#fileList"),
  fileTemplate: $("#fileTemplate"),
};

init();

async function init() {
  window.addEventListener("error", (event) => {
    setLoginStatus(`Error del panel: ${event.message}`, true);
  });
  window.addEventListener("unhandledrejection", (event) => {
    setLoginStatus(`Error de conexion: ${event.reason?.message || event.reason || "revisa internet"}`, true);
  });

  bindEvents();
  try {
    const { data } = await withTimeout(
      supabaseClient.auth.getSession(),
      12000,
      "No pude revisar la sesion. Abre el panel con internet activo o desde http://localhost."
    );
    setSession(data.session);
  } catch (error) {
    setSession(null);
    setLoginStatus(error.message || String(error), true);
  }

  supabaseClient.auth.onAuthStateChange((_event, session) => {
    setSession(session);
  });
}

function bindEvents() {
  els.loginForm.addEventListener("submit", signIn);
  els.createAccessButton.addEventListener("click", createAccess);
  els.resetPasswordButton.addEventListener("click", resetPassword);
  els.signOutButton.addEventListener("click", signOut);
  els.fileForm.addEventListener("submit", saveFile);
  els.newButton.addEventListener("click", resetForm);
  els.refreshButton.addEventListener("click", loadFiles);
  els.publishButton.addEventListener("click", publishChanges);
  els.searchInput.addEventListener("input", renderFiles);
  els.nameInput.addEventListener("input", () => {
    if (!els.editingId.value && !els.slugInput.dataset.touched) {
      els.slugInput.value = safeSlug(els.nameInput.value);
    }
  });
  els.slugInput.addEventListener("input", () => {
    els.slugInput.dataset.touched = "true";
    els.slugInput.value = safeSlug(els.slugInput.value);
  });
  els.categoryInput.addEventListener("change", suggestTargetPath);
  els.targetBundleInput.addEventListener("change", syncAssetVariantWithTargetBundle);
  els.assetVariantInput.addEventListener("change", () => {
    applyAssetVariant(els.assetVariantInput.value);
  });
  els.fileInput.addEventListener("change", suggestTargetPath);
  els.targetPathInput.addEventListener("input", () => {
    els.targetPathInput.dataset.touched = "true";
    els.targetPathInput.value = safeRelativePath(els.targetPathInput.value);
    updateAssetVariantVisibility();
  });
  renderPresets();
}

async function signIn(event) {
  event.preventDefault();
  setBusy(true, "Entrando...");
  setLoginStatus("Conectando con Supabase...");

  try {
    const { data, error } = await withTimeout(
      supabaseClient.auth.signInWithPassword({
        email: els.emailInput.value.trim(),
        password: els.passwordInput.value,
      }),
      20000,
      "Supabase no respondio. Revisa internet o abre el panel desde http://localhost en vez de file://."
    );

    if (error) {
      setLoginStatus(authErrorMessage(error), true);
      return;
    }

    setLoginStatus("Login correcto. Cargando panel...", false, true);
    setSession(data.session);
  } catch (error) {
    setLoginStatus(error.message || String(error), true);
  } finally {
    setBusy(false);
  }
}

async function createAccess() {
  const email = els.emailInput.value.trim();
  const password = els.passwordInput.value;
  if (!email || !password) {
    setLoginStatus("Escribe correo y contrasena para crear el acceso.", true);
    return;
  }
  if (!isAllowedAdminEmail(email)) {
    setLoginStatus("Ese correo no esta en la lista admin del panel.", true);
    return;
  }

  setBusy(true, "Creando acceso...");
  setLoginStatus("Creando acceso en Supabase...");

  try {
    const { data, error } = await withTimeout(
      supabaseClient.auth.signUp({
        email,
        password,
      }),
      20000,
      "Supabase no respondio. Revisa internet y vuelve a intentar."
    );

    if (error) {
      setLoginStatus(createAccessErrorMessage(error), true);
      return;
    }

    if (data.session) {
      setLoginStatus("Acceso creado. Cargando panel...", false, true);
      setSession(data.session);
      return;
    }

    setLoginStatus("Acceso creado. Si Supabase pide confirmacion, revisa el correo y luego entra.", false, true);
  } catch (error) {
    setLoginStatus(error.message || String(error), true);
  } finally {
    setBusy(false);
  }
}

async function resetPassword() {
  const email = els.emailInput.value.trim();
  if (!email) {
    setLoginStatus("Escribe el correo primero.", true);
    return;
  }
  if (!isAllowedAdminEmail(email)) {
    setLoginStatus("Ese correo no esta en la lista admin del panel.", true);
    return;
  }

  setBusy(true, "Enviando recuperacion...");
  setLoginStatus("Enviando correo de recuperacion...");

  try {
    const redirectTo = window.location.protocol.startsWith("http")
      ? window.location.href
      : undefined;
    const { error } = await withTimeout(
      supabaseClient.auth.resetPasswordForEmail(email, {
        redirectTo,
      }),
      20000,
      "Supabase no respondio. Revisa internet y vuelve a intentar."
    );

    if (error) {
      setLoginStatus(error.message || String(error), true);
      return;
    }

    setLoginStatus("Listo. Revisa ese correo para cambiar la contrasena.", false, true);
  } catch (error) {
    setLoginStatus(error.message || String(error), true);
  } finally {
    setBusy(false);
  }
}

async function signOut() {
  await supabaseClient.auth.signOut();
  setSession(null);
}

function setSession(session) {
  state.session = session;
  const signedIn = Boolean(session);
  els.loginPanel.classList.toggle("hidden", signedIn);
  els.adminPanel.classList.toggle("hidden", !signedIn);
  els.signOutButton.classList.toggle("hidden", !signedIn);
  els.sessionEmail.textContent = session?.user?.email ?? "Sin sesion";

  if (signedIn) {
    setLoginStatus("Sesion iniciada.", false, true);
    loadFiles();
  } else {
    state.files = [];
    renderFiles();
  }
}

async function loadFiles() {
  if (!state.session) return;
  setBusy(true, "Cargando archivos...");
  const { data, error } = await supabaseClient.rpc("admin_list_remote_content_files");
  setBusy(false);

  if (error) {
    setStatus(adminErrorMessage(error));
    state.files = [];
    renderFiles();
    return;
  }

  state.files = data ?? [];
  setStatus("Listo. Recuerda publicar para que los iPhone reciban los cambios.");
  renderFiles();
}

async function saveFile(event) {
  event.preventDefault();
  if (!state.session || state.busy) return;

  const file = els.fileInput.files?.[0];
  if (!file) {
    setStatus("Selecciona un archivo.");
    return;
  }

  const name = els.nameInput.value.trim();
  const slug = safeSlug(els.slugInput.value || name);
  const selectedAssetVariant = els.assetVariantLabel.classList.contains("hidden")
    ? null
    : ASSET_VARIANTS[els.assetVariantInput.value];
  const targetBundle = safeTargetBundle(selectedAssetVariant?.targetBundle || els.targetBundleInput.value);
  const targetPath = safeRelativePath(selectedAssetVariant?.targetPath || els.targetPathInput.value || `${els.categoryInput.value}/${file.name}`);
  if (!name || !slug) {
    setStatus("Completa nombre y slug.");
    return;
  }
  if (!targetPath) {
    setStatus("Completa la ruta que va a reemplazar en GREEG APP.");
    return;
  }
  if (!isCompleteTargetPath(targetPath)) {
    setStatus("La ruta debe incluir carpeta y archivo. Usa una plantilla o escribe algo como patches/mi-archivo.bundle.");
    return;
  }

  setBusy(true, "Calculando SHA-256...");
  try {
    const hash = await sha256Hex(file);
    let uploadedPath = "";
    const storagePath = `content/${crypto.randomUUID()}/${safeFileName(file.name)}`;

    setStatus("Subiendo archivo...");
    const { error: uploadError } = await supabaseClient.storage
      .from(BUCKET)
      .upload(storagePath, file, {
        cacheControl: "3600",
        contentType: file.type || "application/octet-stream",
        upsert: true,
      });

    if (uploadError) throw uploadError;
    uploadedPath = storagePath;

    setStatus("Guardando metadata...");
    const isReplacing = Boolean(els.editingId.value);
    const { error: rpcError } = await supabaseClient.rpc("admin_upsert_remote_content_file", {
      p_id: els.editingId.value || null,
      p_name: name,
      p_slug: slug,
      p_category: els.categoryInput.value || "files",
      p_target_bundle: targetBundle,
      p_target_path: targetPath,
      p_description: els.descriptionInput.value.trim() || null,
      p_file_name: file.name,
      p_mime_type: file.type || "application/octet-stream",
      p_byte_size: file.size,
      p_sha256: hash,
      p_storage_path: storagePath,
      p_force_new: !isReplacing,
    });

    if (rpcError) {
      if (uploadedPath) {
        await supabaseClient.storage.from(BUCKET).remove([uploadedPath]).catch(() => {});
      }
      throw rpcError;
    }

    resetForm();
    await loadFiles();
    setStatus(isReplacing
      ? "Patch reemplazado. Pulsa Publicar cambios cuando estes listo."
      : "Patch nuevo creado. Pulsa Publicar cambios cuando estes listo."
    );
  } catch (error) {
    const message = adminErrorMessage(error);
    setStatus(message);
    window.alert(message);
  } finally {
    setBusy(false);
  }
}

async function toggleActive(file) {
  if (!state.session || state.busy) return;
  setBusy(true, "Actualizando estado...");
  const { error } = await supabaseClient.rpc("admin_set_remote_content_active", {
    p_id: file.id,
    p_is_active: !file.is_active,
  });
  setBusy(false);

  if (error) {
    setStatus(adminErrorMessage(error));
    return;
  }

  await loadFiles();
}

async function deleteFile(file) {
  if (!state.session || state.busy) return;
  const ok = confirm(`Eliminar "${file.name}" en la proxima publicacion?`);
  if (!ok) return;

  setBusy(true, "Marcando eliminacion...");
  const { error } = await supabaseClient.rpc("admin_delete_remote_content_file", {
    p_id: file.id,
  });
  setBusy(false);

  if (error) {
    setStatus(adminErrorMessage(error));
    return;
  }

  await loadFiles();
}

async function disablePreset(preset) {
  if (!state.session || state.busy) return;
  const rules = presetRules(preset);
  const ok = confirm(`Quitar "${preset.name}" completo en la proxima publicacion?`);
  if (!ok) return;

  setBusy(true, "Preparando eliminacion...");
  let firstError = null;
  for (const rule of rules) {
    const { error } = await supabaseClient.rpc("admin_disable_remote_content_target", {
      p_name: preset.name,
      p_slug: rule.slug,
      p_category: rule.category || preset.category || "patches",
      p_target_bundle: ruleTargetBundle(preset, rule),
      p_target_path: safeRelativePath(rule.targetPath),
      p_description: rule.description || preset.description || null,
    });
    if (error) {
      firstError = error;
      break;
    }
  }
  setBusy(false);

  if (firstError) {
    setStatus(adminErrorMessage(firstError));
    return;
  }

  await loadFiles();
  setStatus(`"${preset.name}" completo quedo marcado para quitarse. Pulsa Publicar cambios.`);
}

async function publishChanges() {
  if (!state.session || state.busy) return;
  setBusy(true, "Publicando manifest...");
  const { data, error } = await supabaseClient.rpc("admin_publish_remote_content");
  setBusy(false);

  if (error) {
    setStatus(adminErrorMessage(error));
    return;
  }

  setStatus(`Publicado v${data?.version ?? "nueva"}. Los iPhone lo veran al abrir o al buscar actualizaciones.`);
  await loadFiles();
}

function editFile(file) {
  els.formTitle.textContent = `Reemplazar v${file.version}`;
  els.editingId.value = file.id;
  els.nameInput.value = file.name;
  els.slugInput.value = file.slug;
  els.slugInput.dataset.touched = "true";
  els.categoryInput.value = file.category || "files";
  els.targetBundleInput.value = safeTargetBundle(file.target_bundle);
  els.targetPathInput.value = file.target_path || fallbackTargetPath(file);
  els.targetPathInput.dataset.touched = "true";
  updateAssetVariantVisibility();
  els.descriptionInput.value = file.description || "";
  els.fileInput.value = "";
  els.saveButton.textContent = "Reemplazar archivo";
  els.nameInput.focus();
}

function resetForm() {
  els.formTitle.textContent = "Nuevo patch";
  els.fileForm.reset();
  els.editingId.value = "";
  delete els.slugInput.dataset.touched;
  delete els.targetPathInput.dataset.touched;
  els.categoryInput.value = "files";
  els.targetBundleInput.value = DEFAULT_TARGET_BUNDLE;
  els.targetPathInput.value = "";
  updateAssetVariantVisibility();
  els.saveButton.textContent = "Crear patch nuevo";
  setStatus("Modo nuevo: se creara otro patch, no se reemplazara uno publicado.");
}

function applyPreset(preset, selectedRule = null) {
  const rule = selectedRule || presetRules(preset)[0];

  resetForm();
  els.formTitle.textContent = `Nuevo ${preset.name}`;
  els.editingId.value = "";
  els.nameInput.value = preset.name;
  els.slugInput.value = rule.slug;
  els.slugInput.dataset.touched = "true";
  els.categoryInput.value = rule.category || preset.category || "patches";
  els.targetBundleInput.value = ruleTargetBundle(preset, rule);
  els.targetPathInput.value = safeRelativePath(rule.targetPath);
  els.targetPathInput.dataset.touched = "true";
  if (rule.assetVariant) {
    els.assetVariantInput.value = rule.assetVariant;
  }
  updateAssetVariantVisibility();
  els.descriptionInput.value = rule.description || preset.description || "";
  els.fileInput.value = "";
  els.saveButton.textContent = "Crear patch nuevo";
  els.fileInput.focus();
  setStatus(`Listo para crear un patch nuevo de ${rule.label || preset.name}. No reemplazara los publicados.`);
}

function suggestTargetPath() {
  if (els.editingId.value || els.targetPathInput.dataset.touched) return;
  const file = els.fileInput.files?.[0];
  if (!file) return;
  els.targetPathInput.value = safeRelativePath(`${els.categoryInput.value || "files"}/${file.name}`);
  updateAssetVariantVisibility();
}

function applyAssetVariant(value) {
  const variant = ASSET_VARIANTS[value] || ASSET_VARIANTS.pen;
  els.targetBundleInput.value = safeTargetBundle(variant.targetBundle);
  els.targetPathInput.value = safeRelativePath(variant.targetPath);
  els.targetPathInput.dataset.touched = "true";
  els.categoryInput.value = "patches";
  updateAssetVariantVisibility();
}

function syncAssetVariantWithTargetBundle() {
  if (shouldShowAssetVariant()) {
    const nextVariant = safeTargetBundle(els.targetBundleInput.value) === FREE_FIRE_MAX_BUNDLE
      ? "pen"
      : "h5";
    els.assetVariantInput.value = nextVariant;
    applyAssetVariant(nextVariant);
    return;
  }
  updateAssetVariantVisibility();
}

function updateAssetVariantVisibility() {
  const variantKey = assetVariantKeyForPath(els.targetPathInput.value);
  const shouldShow = shouldShowAssetVariant(variantKey);

  els.assetVariantLabel.classList.toggle("hidden", !shouldShow);
  if (variantKey) {
    els.assetVariantInput.value = variantKey;
  } else if (shouldShow) {
    els.assetVariantInput.value = safeTargetBundle(els.targetBundleInput.value) === FREE_FIRE_MAX_BUNDLE
      ? "pen"
      : "h5";
  }
}

function shouldShowAssetVariant(variantKey = assetVariantKeyForPath(els.targetPathInput.value)) {
  return variantKey !== null
    || safeSlug(els.slugInput.value).includes("asset-indexer")
    || /asset\s*indexer/i.test(els.nameInput.value);
}

function renderPresets() {
  if (!els.presetList) return;
  els.presetList.replaceChildren();

  for (const preset of PATCH_PRESETS) {
    const rules = presetRules(preset);
    const matches = rules.map((rule) =>
      state.files.find((file) =>
        !file.deleted_at
          && file.is_active
          && (sameTarget(file, preset, rule) || safeSlug(file.slug) === rule.slug)
      )
    );
    const completed = matches.filter(Boolean).length;
    const deleted = matches.some((file) => file?.deleted_at);
    const item = document.createElement("div");
    item.className = "presetItem";
    const card = document.createElement("div");
    card.className = "presetButton";
    const ruleRows = rules.map((rule, index) => {
      const existing = matches[index];
      const label = rule.label || rule.targetPath;
      const stateLabel = existing ? `v${existing.version}` : "subir";
      return `
        <button class="presetRuleButton" type="button" data-rule="${index}">
          <span>${escapeHTML(label)} <b>${escapeHTML(stateLabel)}</b></span>
          <small>${escapeHTML(ruleTargetBundle(preset, rule))} / ${escapeHTML(safeRelativePath(rule.targetPath))}</small>
        </button>
      `;
    }).join("");
    card.innerHTML = `
      <strong>${escapeHTML(preset.name)}</strong>
      <span>${escapeHTML(rules.length > 1 ? `${completed}/${rules.length} reglas listas` : (completed ? `v${matches[0]?.version} listo para reemplazar` : "Crear / reemplazar"))}</span>
      <small>${escapeHTML(rules.length > 1 ? "varias apps/rutas" : safeTargetBundle(preset.targetBundle))}</small>
      <div class="presetRules">${ruleRows}</div>
    `;
    card.querySelectorAll(".presetRuleButton").forEach((button) => {
      const index = Number(button.dataset.rule || "0");
      button.addEventListener("click", () => applyPreset(preset, rules[index]));
    });
    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.className = "presetRemoveButton";
    removeButton.textContent = deleted ? "Por quitar" : "Quitar";
    removeButton.addEventListener("click", () => disablePreset(preset));
    item.append(card, removeButton);
    els.presetList.append(item);
  }
}

function renderFiles() {
  const query = els.searchInput.value.trim().toLowerCase();
  const files = state.files.filter((file) => {
    if (!query) return true;
    return [file.name, file.slug, file.file_name, file.target_bundle, file.target_path, file.category, file.description]
      .filter(Boolean)
      .some((value) => String(value).toLowerCase().includes(query));
  });

  els.fileList.replaceChildren();
  els.fileCounter.textContent = `${files.length} ${files.length === 1 ? "archivo" : "archivos"}`;
  renderPresets();

  if (!files.length) {
    const empty = document.createElement("p");
    empty.className = "muted";
    empty.textContent = state.files.length ? "No hay resultados para esa busqueda." : "Todavia no hay archivos.";
    els.fileList.append(empty);
    return;
  }

  for (const file of files) {
    const node = els.fileTemplate.content.firstElementChild.cloneNode(true);
    node.querySelector("h3").textContent = file.name;
    node.querySelector(".fileMeta").textContent = [
      file.category || "files",
      `v${file.version}`,
      file.target_bundle || DEFAULT_TARGET_BUNDLE,
      file.file_name,
      formatBytes(file.byte_size),
    ].join(" / ");
    node.querySelector(".filePath").textContent = `Ruta: ${file.target_path || fallbackTargetPath(file)}`;
    node.querySelector(".fileHash").textContent = file.sha256;

    const badge = node.querySelector(".badge");
    badge.textContent = badgeLabel(file);
    badge.classList.toggle("pending", file.sync_state !== "published");
    badge.classList.toggle("inactive", !file.is_active || file.deleted_at);

    const toggleButton = node.querySelector(".toggleButton");
    toggleButton.textContent = file.is_active ? "Desactivar" : "Activar";
    toggleButton.addEventListener("click", () => toggleActive(file));
    node.querySelector(".replaceButton").addEventListener("click", () => editFile(file));
    node.querySelector(".deleteButton").addEventListener("click", () => deleteFile(file));

    els.fileList.append(node);
  }
}

function presetRules(preset) {
  if (Array.isArray(preset.rules) && preset.rules.length) {
    return preset.rules;
  }
  return [{
    label: preset.name,
    slug: preset.slug,
    category: preset.category,
    description: preset.description,
    targetPath: preset.targetPath,
  }];
}

function sameTarget(file, preset, rule) {
  return samePath(file.target_path, rule.targetPath)
    && safeTargetBundle(file.target_bundle) === ruleTargetBundle(preset, rule);
}

function ruleTargetBundle(preset, rule) {
  return safeTargetBundle(rule?.targetBundle || preset?.targetBundle);
}

function assetVariantKeyForPath(value) {
  const target = safeRelativePath(value).toLowerCase();
  if (!target) return null;
  for (const [key, variant] of Object.entries(ASSET_VARIANTS)) {
    if (target === safeRelativePath(variant.targetPath).toLowerCase()) {
      return key;
    }
  }
  if (target.includes("assetindexer.penojqaq")) return "pen";
  if (target.includes("assetindexer.u6zff")) return "h5";
  if (target.includes("assetindexer.h5ak1jm1eck")) return "h5";
  return null;
}

function safeTargetBundle(value) {
  const clean = String(value || DEFAULT_TARGET_BUNDLE).trim().toLowerCase();
  if (clean === FREE_FIRE_MAX_BUNDLE) return clean;
  return DEFAULT_TARGET_BUNDLE;
}

function badgeLabel(file) {
  if (file.deleted_at) return "Por eliminar";
  if (!file.is_active) return "Inactivo";
  if (file.sync_state === "new_pending") return "Nuevo";
  if (file.sync_state === "change_pending") return "Pendiente";
  return "Publicado";
}

function setBusy(isBusy, message = "") {
  state.busy = isBusy;
  for (const button of document.querySelectorAll("button")) {
    button.disabled = isBusy;
  }
  if (message) setStatus(message);
}

function setStatus(message) {
  els.statusText.textContent = message;
  if (!state.session) {
    setLoginStatus(message);
  }
}

function setLoginStatus(message, isError = false, isOK = false) {
  if (!els.loginStatus) return;
  els.loginStatus.textContent = message;
  els.loginStatus.classList.toggle("error", isError);
  els.loginStatus.classList.toggle("ok", isOK);
}

function authErrorMessage(error) {
  const message = error?.message || String(error);
  if (/invalid login credentials/i.test(message)) {
    return "Correo o contrasena incorrectos. Puedes tocar Crear acceso o Recuperar contrasena.";
  }
  if (/email not confirmed/i.test(message)) {
    return "Ese correo existe, pero falta confirmar el email en Supabase Auth.";
  }
  if (/failed to fetch|network/i.test(message)) {
    return "No pude conectar con Supabase. Prueba abrir el panel desde http://localhost en vez de file://.";
  }
  return message;
}

function createAccessErrorMessage(error) {
  const message = error?.message || String(error);
  if (/already|registered|exists/i.test(message)) {
    return "Ese correo ya existe. Usa Entrar o Recuperar contrasena.";
  }
  if (/signup|disabled/i.test(message)) {
    return "Supabase no permite crear usuarios desde aqui. Crea el usuario en Authentication > Users.";
  }
  return message;
}

function adminErrorMessage(error) {
  const message = error?.message || String(error);
  if (/not authorized/i.test(message)) {
    return "El login funciono, pero ese correo aun no tiene permiso admin. Ejecuta supabase/remote_content_setup.sql en Supabase.";
  }
  if (/could not find the function|function .* does not exist|schema cache/i.test(message)) {
    return "Falta actualizar el backend para crear patches duplicados. Ejecuta supabase/remote_content_setup.sql en Supabase y refresca.";
  }
  if (/duplicate key|unique constraint|target_path|target_bundle_path/i.test(message)) {
    return "Supabase todavia esta bloqueando rutas duplicadas. Ejecuta supabase/remote_content_setup.sql en Supabase una vez, refresca el panel y vuelve a guardar.";
  }
  if (/relation .* does not exist|remote_content/i.test(message)) {
    return "Faltan las tablas del panel. Ejecuta supabase/remote_content_setup.sql en Supabase.";
  }
  if (/slug/i.test(message) && /duplicate|unique/i.test(message)) {
    return "Ya existe un slug igual. El backend actualizado lo corrige automaticamente; ejecuta supabase/remote_content_setup.sql y refresca.";
  }
  return message;
}

function isAllowedAdminEmail(email) {
  return [
    "2008yashirchavez@gmail.com",
    "emmajestevex@gmail.com",
    "grego23500@gmail.com",
  ].includes(email.trim().toLowerCase());
}

function fallbackTargetPath(file) {
  return safeRelativePath(`${file.category || "files"}/${file.slug || "content"}/${file.file_name || "content.bin"}`);
}

function samePath(left, right) {
  return safeRelativePath(left).toLowerCase() === safeRelativePath(right).toLowerCase();
}

function isCompleteTargetPath(value) {
  const parts = safeRelativePath(value).split("/").filter(Boolean);
  return parts.length >= 2 && /\.[a-zA-Z0-9~+-]+$/.test(parts.at(-1) || "");
}

function escapeHTML(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function withTimeout(promise, milliseconds, message) {
  let timeoutID;
  const timeout = new Promise((_, reject) => {
    timeoutID = setTimeout(() => reject(new Error(message)), milliseconds);
  });
  return Promise.race([promise, timeout]).finally(() => clearTimeout(timeoutID));
}

async function sha256Hex(file) {
  const buffer = await file.arrayBuffer();
  const digest = await crypto.subtle.digest("SHA-256", buffer);
  return [...new Uint8Array(digest)]
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function safeSlug(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/^\.+|\.+$/g, "")
    .slice(0, 80);
}

function safeRelativePath(value) {
  return String(value || "")
    .trim()
    .replace(/\\/g, "/")
    .replace(/[^a-zA-Z0-9._/~+-]+/g, "-")
    .replace(/\/+/g, "/")
    .split("/")
    .filter((part) => part && part !== "." && part !== "..")
    .map((part) => safeFileName(part))
    .join("/")
    .slice(0, 180);
}

function safeFileName(value) {
  const clean = String(value || "file.bin")
    .trim()
    .replace(/[^a-zA-Z0-9._~+-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/^\.+|\.+$/g, "");
  return clean || "file.bin";
}

function formatBytes(value) {
  return new Intl.NumberFormat("es", {
    style: "unit",
    unit: "byte",
    notation: "compact",
    unitDisplay: "short",
  }).format(Number(value || 0));
}
