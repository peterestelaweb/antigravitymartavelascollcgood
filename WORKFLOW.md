# 🚀 Guía de Trabajo con Git - School of Midlife

## 📋 Comandos Básicos Diarios

### Ver el estado actual
```bash
git status
```

### Ver qué rama estás usando
```bash
git branch
```

---

## 🌿 Trabajar con Ramas

### Crear una nueva rama para hacer cambios
```bash
# Crear y cambiar a una nueva rama
git checkout -b feature/nombre-de-la-funcionalidad

# Ejemplos:
git checkout -b feature/actualizar-testimonios
git checkout -b fix/corregir-foto-mentor
git checkout -b content/nuevos-textos
```

### Cambiar entre ramas
```bash
# Volver a la rama principal
git checkout main

# Cambiar a otra rama existente
git checkout feature/nombre-rama
```

### Ver todas las ramas
```bash
git branch -a
```

---

## 💾 Guardar Cambios (Commits)

### 1. Ver qué archivos cambiaron
```bash
git status
```

### 2. Añadir archivos al staging
```bash
# Añadir todos los archivos modificados
git add .

# O añadir archivos específicos
git add App.tsx
git add public/marta.jpg
```

### 3. Hacer commit con mensaje descriptivo
```bash
git commit -m "Descripción clara de los cambios"

# Ejemplos de buenos mensajes:
git commit -m "Añadir nuevos testimonios de alumnas"
git commit -m "Actualizar foto del mentor"
git commit -m "Corregir error en sección de programas"
git commit -m "Traducir contenido al inglés"
```

### 4. Subir cambios a GitHub
```bash
# Si es la primera vez que subes esta rama
git push -u origin nombre-de-la-rama

# Si la rama ya existe en GitHub
git push
```

---

## 🔄 Fusionar Cambios a Main

### Opción 1: Desde la línea de comandos
```bash
# 1. Cambiar a la rama main
git checkout main

# 2. Asegurarte de tener la última versión
git pull origin main

# 3. Fusionar tu rama de trabajo
git merge feature/nombre-de-tu-rama

# 4. Subir los cambios fusionados
git push origin main
```

### Opción 2: Pull Request en GitHub (Recomendado)
1. Ve a tu repositorio en GitHub
2. Verás un botón "Compare & pull request" después de hacer push
3. Revisa los cambios
4. Haz clic en "Create pull request"
5. Revisa y haz clic en "Merge pull request"
6. Luego en tu local:
```bash
git checkout main
git pull origin main
```

---

## 📥 Actualizar desde GitHub

### Traer los últimos cambios
```bash
# Estando en la rama main
git pull origin main
```

---

## 🏗️ Flujo de Trabajo Completo (Ejemplo)

```bash
# 1. Asegurarte de estar en main y actualizado
git checkout main
git pull origin main

# 2. Crear una nueva rama para tu tarea
git checkout -b feature/actualizar-precios

# 3. Hacer cambios en el código...
# (editar archivos en tu editor)

# 4. Ver qué cambió
git status

# 5. Añadir cambios
git add .

# 6. Hacer commit
git commit -m "Actualizar precios de los programas"

# 7. Subir a GitHub
git push -u origin feature/actualizar-precios

# 8. Ir a GitHub y crear Pull Request
# O fusionar directamente:
git checkout main
git merge feature/actualizar-precios
git push origin main

# 9. Opcional: Borrar la rama ya fusionada
git branch -d feature/actualizar-precios
```

---

## 🆘 Comandos Útiles de Emergencia

### Deshacer cambios NO guardados
```bash
# Deshacer cambios en un archivo específico
git checkout -- App.tsx

# Deshacer TODOS los cambios no guardados (¡cuidado!)
git reset --hard
```

### Ver el historial de commits
```bash
git log --oneline
```

### Ver diferencias antes de hacer commit
```bash
git diff
```

### Volver a un commit anterior
```bash
# Ver el historial
git log --oneline

# Volver a un commit específico (reemplaza HASH con el código del commit)
git reset --hard HASH
```

---

## 📦 Desplegar a Producción

### Construir la versión de producción
```bash
npm run build
```

### Los archivos listos estarán en la carpeta `dist/`

---

## 🎯 Buenas Prácticas

1. **Siempre trabaja en ramas**, nunca directamente en `main`
2. **Haz commits frecuentes** con mensajes descriptivos
3. **Actualiza desde GitHub** antes de empezar a trabajar
4. **Revisa los cambios** con `git status` y `git diff` antes de hacer commit
5. **Usa nombres descriptivos** para las ramas (feature/, fix/, content/)

---

## 📞 Enlaces Útiles

- **Repositorio GitHub**: https://github.com/peterestelaweb/antigravitymartavelascollcgood
- **Servidor Local**: http://localhost:3001

---

## 🔑 Comandos Más Usados (Resumen)

```bash
git status                    # Ver estado
git checkout -b nueva-rama    # Crear rama
git add .                     # Añadir cambios
git commit -m "mensaje"       # Guardar cambios
git push                      # Subir a GitHub
git checkout main             # Volver a main
git pull origin main          # Actualizar desde GitHub
```
