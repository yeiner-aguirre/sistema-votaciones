# 🗳️ Sistema de Votaciones – API RESTful

Cree una API RESTful desarrollada en **Node.js + Express + MySQL + Sequelize**, que permite gestionar un sistema de votaciones con votantes, candidatos, emisión de votos y estadísticas en tiempo real. Incluye autenticación básica, paginación y filtros.

---

## 🚀 Tecnologías usadas

- Node.js
- Express
- MySQL
- Sequelize
- Dotenv
- CORS
- Postman (para pruebas)
- Autenticación básica (HTTP Basic Auth)

---

## 📦 Instalación

1. Clona este repositorio

2. Instala dependencias:

```bash
npm install
```

3. Crea la base de datos en MySQL:

```sql
CREATE DATABASE votaciones;
```

4. Configura el archivo `.env`:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=votaciones

ADMIN_USER=admin
ADMIN_PASSWORD=1234
```

5. Inicia el servidor:

```bash
node server.js
```

La API estará disponible en: [http://localhost:3000](http://localhost:3000)

---

## 📁 Estructura del proyecto

```
sistema-votaciones/
│
├── controllers/
├── models/
├── routes/
├── middlewares/
├── config/
├── .env
├── server.js
├── app.js
└── README.md
```

---

## 🔐 Autenticación

Se requiere autenticación básica (`Basic Auth`) para:

- Emitir votos
- Eliminar votantes
- Eliminar candidatos

**Usuario y contraseña configurados en `.env`:**

```
ADMIN_USER=admin
ADMIN_PASSWORD=1234
```

En Postman:  
→ Authorization → Type: `Basic Auth` → Ingresa usuario y contraseña.

---

## 📮 Endpoints disponibles

### 🔸 Votantes

| Método | Ruta              | Descripción                  | Protección |
|--------|-------------------|------------------------------|------------|
| POST   | `/voters`         | Registrar un nuevo votante   | ❌         |
| GET    | `/voters`         | Listar votantes (paginado)   | ❌         |
| GET    | `/voters/:id`     | Obtener votante por ID       | ❌         |
| DELETE | `/voters/:id`     | Eliminar votante             | ✅ Basic Auth |

**Filtrado y paginación:**
```
GET /voters?page=1&limit=5&name=juan
```

---

### 🔸 Candidatos

| Método | Ruta                  | Descripción                      | Protección |
|--------|-----------------------|----------------------------------|------------|
| POST   | `/candidates`         | Registrar nuevo candidato        | ❌         |
| GET    | `/candidates`         | Listar candidatos (paginado)     | ❌         |
| GET    | `/candidates/:id`     | Obtener candidato por ID         | ❌         |
| DELETE | `/candidates/:id`     | Eliminar candidato               | ✅ Basic Auth |

**Filtrado y paginación:**
```
GET /candidates?page=1&limit=5&name=laura&party=verde
```

---

### 🔸 Votos

| Método | Ruta               | Descripción                       | Protección |
|--------|--------------------|-----------------------------------|------------|
| POST   | `/votes`           | Emitir un voto                    | ✅ Basic Auth |
| GET    | `/votes`           | Listar todos los votos emitidos  | ❌         |
| GET    | `/votes/statistics`| Estadísticas en tiempo real       | ❌         |

---

## 📊 Estadísticas

`GET /votes/statistics` devuelve:

```json
{
  "total_votes": 12,
  "total_voters_voted": 10,
  "results": [
    {
      "candidate": "Laura Gómez",
      "party": "Verde",
      "votes": 5,
      "percentage": "41.67%"
    }
  ]
}
```

---

## 🧪 Ejemplos en Postman

### Registrar votante
`POST /voters`
```json
{
  "name": "Carlos Pérez",
  "email": "carlos@example.com"
}
```

### Registrar candidato
`POST /candidates`
```json
{
  "name": "Laura Gómez",
  "email": "laura@example.com",
  "party": "Partido Verde"
}
```

### Emitir voto (con autenticación)
`POST /votes`  
(Headers → Basic Auth → admin / 1234)
```json
{
  "voter_id": 1,
  "candidate_id": 2
}
```

---

## 👨‍💻 Autor

Desarrollado por **Yeiner Estiven Aguirre Quirama**  
[GitHub] (https://github.com/yeiner-aguirre) | 
[LinkedIn](https://www.linkedin.com/in/yeiner-estiven-aguirre-quirama-a9b700238/)

---

## ✅ Estado del Proyecto

✔️ Totalmente funcional  
✔️ Validaciones completas  
✔️ Preparado para producción o ampliación  
✔️ Listo para evaluación técnica