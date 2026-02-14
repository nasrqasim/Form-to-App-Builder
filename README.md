# AI Form-to-App Builder

A full-stack web platform that allows users to create complete CRUD web applications by filling out a form. No AI interaction required - just define your schema and generate a working app!

## 🚀 Features

- **Dynamic App Generation**: Create full CRUD applications from a simple form
- **Multiple Field Types**: Support for text, number, email, date, boolean, and select fields
- **Real-time Validation**: Field name uniqueness and required field validation
- **MongoDB Integration**: Automatic schema and collection creation
- **Responsive UI**: Clean, modern interface built with Tailwind CSS
- **Production Ready**: Built with Next.js App Router and Mongoose ODM

## 🧱 Tech Stack

- **Frontend**: React (functional components, hooks)
- **Backend**: Next.js 15 (App Router + API Routes)
- **Database**: MongoDB (local or Atlas)
- **ODM**: Mongoose
- **Styling**: Tailwind CSS
- **Language**: JavaScript

## 📋 Prerequisites

- Node.js 18+ installed
- MongoDB running locally or MongoDB Atlas account
- npm or yarn package manager

## 🛠️ Installation

1. **Clone or navigate to the project directory**

```bash
cd "d:\Form to App Builder"
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure environment variables**

Create a `.env` file in the root directory:

```env
MONGODB_URI=mongodb://localhost:27017/form-app-builder
```

For MongoDB Atlas, use:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/form-app-builder?retryWrites=true&w=majority
```

4. **Start MongoDB** (if using local MongoDB)

```bash
mongod
```

5. **Run the development server**

```bash
npm run dev
```

6. **Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000)

## 📖 Usage

### Creating a New App

1. **Fill out the Form Builder**:
   - Enter an **App Name** (e.g., "Employee Manager")
   - Enter a **Collection Name** (e.g., "employees")
   - Define your fields:
     - Field Name (e.g., "firstName", "email", "salary")
     - Field Type (text, number, email, date, boolean, select)
     - Required checkbox
     - Options (comma-separated, only for select type)

2. **Click "Generate App"**

3. **Your app is ready!** You'll be redirected to the list view

### Using Your Generated App

Each generated app includes:

- **List Page**: View all records in a table
- **Create Page**: Add new records with a dynamic form
- **Edit Page**: Update existing records
- **Delete**: Remove records with confirmation

### Example Schema

```json
{
  "name": "Employee Manager",
  "collectionName": "employees",
  "fields": [
    {
      "fieldName": "firstName",
      "fieldType": "text",
      "required": true
    },
    {
      "fieldName": "email",
      "fieldType": "email",
      "required": true
    },
    {
      "fieldName": "salary",
      "fieldType": "number",
      "required": false
    },
    {
      "fieldName": "department",
      "fieldType": "select",
      "required": true,
      "options": ["Engineering", "Sales", "Marketing", "HR"]
    },
    {
      "fieldName": "isActive",
      "fieldType": "boolean",
      "required": false
    }
  ]
}
```

## 🗂️ Project Structure

```
/app
  /page.js                          → Form Builder UI
  /layout.js                        → Root layout
  /globals.css                      → Global styles
  /apps/[appName]/
    /create/page.js                 → Create record page
    /list/page.js                   → List all records page
    /edit/[id]/page.js              → Edit record page
  /api/
    /generate/route.js              → App generation endpoint
    /apps/[appName]/
      /create/route.js              → Create record API
      /list/route.js                → List records API
      /update/[id]/route.js         → Update record API
      /delete/[id]/route.js         → Delete record API

/lib
  /mongodb.js                       → MongoDB connection utility

/models
  /AppMeta.js                       → App metadata schema
  /dynamicModel.js                  → Dynamic model factory

/tailwind.config.js                 → Tailwind configuration
/postcss.config.js                  → PostCSS configuration
/next.config.mjs                    → Next.js configuration
/.env                               → Environment variables
```

## 🔐 Security Features

- Field name sanitization
- Input validation on both client and server
- MongoDB injection prevention via Mongoose
- Environment variable protection
- Safe dynamic model creation

## 🧪 Testing Your App

1. Create a test app (e.g., "Task Manager")
2. Add some fields (title, description, priority, dueDate)
3. Generate the app
4. Create a few records
5. Edit and delete records
6. Refresh the page - data should persist

## 🚨 Troubleshooting

### MongoDB Connection Issues

- Ensure MongoDB is running: `mongod`
- Check your `MONGODB_URI` in `.env`
- For Atlas, verify network access and credentials

### Port Already in Use

```bash
# Kill process on port 3000
npx kill-port 3000
```

### Module Not Found Errors

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 🎯 API Endpoints

### Generate App
```
POST /api/generate
Body: { name, collectionName, fields }
```

### Create Record
```
POST /api/apps/{appName}/create
Body: { ...fieldData }
```

### List Records
```
GET /api/apps/{appName}/list
Returns: { items, appMeta }
```

### Get Single Record
```
GET /api/apps/{appName}/update/{id}
Returns: { item, appMeta }
```

### Update Record
```
PUT /api/apps/{appName}/update/{id}
Body: { ...fieldData }
```

### Delete Record
```
DELETE /api/apps/{appName}/delete/{id}
```

## 🌟 Future Enhancements

- [ ] User authentication
- [ ] App management dashboard
- [ ] Export/import schemas
- [ ] Custom validation rules
- [ ] File upload support
- [ ] Relationship between collections
- [ ] Search and filtering
- [ ] Pagination
- [ ] Dark mode toggle

## 📝 License

MIT

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

---

**Built with ❤️ using Next.js, React, and MongoDB**
