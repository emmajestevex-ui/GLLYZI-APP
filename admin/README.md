# GREEG APP Admin

Panel estatico para administrar contenido remoto propio de GREEG APP desde una PC.

## Uso

1. Ejecuta `supabase/remote_content_setup.sql` en el SQL Editor del proyecto Supabase.
2. Asegurate de que tu usuario exista en `public.license_admins`.
3. Abre `admin/index.html` en el navegador o sube la carpeta `admin/` a un hosting privado.
4. Entra con tu correo y contrasena de Supabase.
5. Sube o reemplaza archivos y pulsa `Publicar cambios`.

La app iOS usa la misma publishable key y descarga solo los archivos publicados que cambien. No se incluye ninguna `service_role` ni secret key en este panel.
