# Instrucciones para Archivos Multimedia

Para que el sistema de contraseñas funcione correctamente, necesitas añadir los archivos de imagen y audio correspondientes a cada contraseña.

## Estructura de Carpetas

Los archivos deben colocarse en las siguientes carpetas:

- Imágenes: `/public/artists/`
- Audio: `/public/audio/`

## Archivos Necesarios

Para cada contraseña configurada, debes proporcionar los siguientes archivos:

### Contraseña: "lilpetey" (también funciona como "Lil Petey")
- Imagen: `/public/artists/lilpetey.jpg`
- Audio: `/public/audio/lilpetey.mp3`

### Contraseña: "dogman"
- Imagen: `/public/artists/dogman.jpg`
- Audio: `/public/audio/dogman.mp3`

### Contraseña: "catman"
- Imagen: `/public/artists/catman.jpg`
- Audio: `/public/audio/catman.mp3`

### Contraseña: "petey"
- Imagen: `/public/artists/petey.jpg`
- Audio: `/public/audio/petey.mp3`

### Contraseña: "sarah"
- Imagen: `/public/artists/sarah.jpg`
- Audio: `/public/audio/sarah.mp3`

## Recomendaciones para los Archivos

### Imágenes
- Formato recomendado: JPG o PNG
- Tamaño recomendado: Cuadrado (1:1)
- Resolución: Al menos 500x500 píxeles
- Tamaño de archivo: Preferiblemente menor a 1MB

### Audio
- Formato: MP3
- Duración recomendada: Entre 10-30 segundos
- Calidad: 128kbps o superior
- Tamaño de archivo: Preferiblemente menor a 5MB

## Nota Importante

Los archivos de marcador actuales en estas carpetas solo son placeholders y deben ser reemplazados con archivos reales. Los archivos de texto no funcionarán como imágenes o audio.

## Cómo Agregar Nuevas Contraseñas

Si deseas agregar nuevas contraseñas, debes:

1. Añadir la contraseña y su configuración en el archivo `components/PasswordEntry.tsx`
2. Añadir los archivos de imagen y audio correspondientes en las carpetas mencionadas
3. Seguir la convención de nombres (nombre de la contraseña sin espacios y en minúsculas)

Por ejemplo, para una nueva contraseña "Gran Duquesa", los archivos serían:
- `/public/artists/granduquesa.jpg`
- `/public/audio/granduquesa.mp3`
