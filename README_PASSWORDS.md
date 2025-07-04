# 🎉 Sistema de Contraseñas para Dogman Fest

Este sistema permite a los usuarios ingresar contraseñas específicas para desbloquear contenido exclusivo de diferentes artistas del Dog Man Fest.

## ✨ Funcionamiento

1. En la página principal hay un campo para ingresar contraseñas
2. Al ingresar una contraseña válida, se muestra una animación de éxito
3. Se abre un modal con:
   - Una imagen del artista (con animación de entrada)
   - Un reproductor de audio que se inicia automáticamente
   - Créditos, descripción y enlaces a redes sociales
4. Si la contraseña es incorrecta, se muestra un diálogo de error

## 🔑 Contraseñas Configuradas

Actualmente el sistema tiene las siguientes contraseñas configuradas:

| Contraseña | Archivos Necesarios | Redes Sociales | Descripción |
|------------|---------------------|----------------|-------------|
| lilpetey   | `/public/artists/lilpetey.jpg`<br>`/public/audio/lilpetey.mp3` | Instagram: @lilpetey | Creador de beats y música para Dog Man Fest |
| dogman     | `/public/artists/dogman.jpg`<br>`/public/audio/dogman.mp3` | Instagram: @dogman | El héroe canino que todos amamos |
| catman     | `/public/artists/catman.jpg`<br>`/public/audio/catman.mp3` | Twitter: @catman | El felino favorito de todos los fans |
| petey      | `/public/artists/petey.jpg`<br>`/public/audio/petey.mp3` | Instagram: @petey | El gato con los planes más locos |
| sarah      | `/public/artists/sarah.jpg`<br>`/public/audio/sarah.mp3` | Facebook: @sarahhatoff | Reportera estrella de Dog Man Fest |

## 🌟 Características del sistema

- Interfaz de usuario con animaciones (usando Framer Motion)
- Las contraseñas son case-insensitive (no distinguen mayúsculas/minúsculas)
- Los espacios se eliminan automáticamente (por ejemplo, "Lil Petey" y "LilPetey" son equivalentes)
- El audio se detiene automáticamente al cerrar el modal
- Animación de verificación con spinner cuando se envía la contraseña
- Animación de éxito cuando la contraseña es válida
- Diálogo de error personalizado cuando la contraseña es inválida
- Muestra pistas después de varios intentos fallidos
- Enfoque automático en el campo de contraseña para mejorar la usabilidad
- Diseño responsivo que se adapta a diferentes tamaños de pantalla
- Compatibilidad con modo oscuro y claro

## ⚙️ Cómo añadir nuevas contraseñas

Para añadir una nueva contraseña, edita el archivo `components/PasswordEntry.tsx` y añade una nueva entrada al objeto `passwordMap` siguiendo este formato:

```typescript
nombrecontraseña: {
  image: "/artists/nombrecontraseña.jpg",
  audioSrc: "/audio/nombrecontraseña.mp3",
  artistName: "Nombre del Artista",
  socialLink: "https://redessociales.com/nombreartista",
  description: "Breve descripción del artista", // Opcional
},
```

Luego, asegúrate de añadir los archivos correspondientes en:
- `/public/artists/nombrecontraseña.jpg` - Imagen del artista (preferiblemente en formato 1:1)
- `/public/audio/nombrecontraseña.mp3` - Archivo de audio (preferiblemente corto, 10-30 segundos)

## 📱 Requerimientos técnicos

- Next.js 14+
- React 18+
- Tailwind CSS
- ShadCN UI (para componentes como Dialog, Button e Input)
- Framer Motion (para animaciones)

## 🔧 Personalización

Si deseas cambiar el aspecto visual del sistema:

1. Para modificar el estilo del campo de contraseña y botones, edita las clases en el componente `PasswordEntry.tsx`
2. Para cambiar el fondo de la página, modifica las clases en `page.tsx`
3. Para actualizar el logo, cambia la URL de la imagen en `page.tsx`
