

## Plan: Activar Manual de Abril en Mi Club

### Cambio único en `src/pages/MiClub.tsx`

1. Agregar campo `link` al tipo de los manuales.
2. Cambiar el manual de Abril (id: 2) de `status: "upcoming"` a `status: "available"` y asignarle el link `https://drive.google.com/file/d/1K5sy5apRM1MHB-KeYpKoIQZR7qv5EHRj/view?usp=drive_link`.
3. Agregar `link` al manual de Marzo con su URL existente.
4. Actualizar el botón "Descargar PDF" para usar `manual.link` dinámicamente en vez del URL hardcodeado.

Resultado: Abril se verá idéntico a Marzo (misma card, mismo botón, mismo estilo). Sin cambios de backend.

