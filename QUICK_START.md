# 🚀 Quick Start Guide

## Your App is Ready!

The development server is **already running** at:
👉 **http://localhost:3000**

---

## ⚡ 3-Minute Test

### Step 1: Open the App
Open your browser and go to: **http://localhost:3000**

### Step 2: Create Your First App
Fill in the form:

**App Name:** `Task Manager`

**Collection Name:** `tasks`

**Fields:**
1. Click "Add Field" if needed
2. Field 1:
   - Name: `title`
   - Type: `text`
   - ✅ Required
3. Field 2:
   - Name: `description`
   - Type: `text`
   - ❌ Not required
4. Field 3:
   - Name: `priority`
   - Type: `select`
   - ✅ Required
   - Options: `Low,Medium,High,Urgent`
5. Field 4:
   - Name: `dueDate`
   - Type: `date`
   - ❌ Not required
6. Field 5:
   - Name: `completed`
   - Type: `boolean`
   - ❌ Not required

### Step 3: Generate!
Click the big blue **"Generate App"** button

### Step 4: Add Records
1. Click **"Add New Task"**
2. Fill in:
   - Title: `Build the MVP`
   - Description: `Complete the form-to-app builder`
   - Priority: `High`
   - Due Date: `2026-02-15`
   - Completed: ✅
3. Click **"Save Task"**

### Step 5: Test CRUD
- ✅ **Create**: Add 2-3 more tasks
- ✅ **Read**: See them in the list
- ✅ **Update**: Click edit icon, change priority
- ✅ **Delete**: Click delete icon, confirm

### Step 6: Verify Persistence
- Refresh the page (F5)
- All your data is still there! 🎉

---

## 🗄️ MongoDB Setup

### Option A: Local MongoDB (Recommended for Testing)

**Windows:**
```bash
# If MongoDB is installed, start it:
mongod

# Or use MongoDB Compass GUI
```

**The app is already configured to use:**
```
mongodb://localhost:27017/form-app-builder
```

### Option B: MongoDB Atlas (Cloud - Free)

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a cluster (M0 Free tier)
4. Click "Connect" → "Connect your application"
5. Copy the connection string
6. Edit `.env` file:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/form-app-builder?retryWrites=true&w=majority
```
7. Restart the server: `Ctrl+C` then `npm run dev`

---

## 🎯 What You Can Build

Examples of apps you can create:

### 1. Contact Manager
- name (text)
- email (email)
- phone (text)
- company (text)
- status (select: Active, Inactive)

### 2. Inventory System
- productName (text)
- sku (text)
- quantity (number)
- price (number)
- category (select)
- inStock (boolean)

### 3. Event Planner
- eventName (text)
- date (date)
- location (text)
- attendees (number)
- status (select: Planned, Confirmed, Completed)

### 4. Student Records
- firstName (text)
- lastName (text)
- email (email)
- grade (select: A, B, C, D, F)
- enrollmentDate (date)
- isActive (boolean)

---

## 🔧 Troubleshooting

### Server Not Running?
```bash
cd "d:\Form to App Builder"
npm run dev
```

### MongoDB Connection Error?
- **Local**: Make sure `mongod` is running
- **Atlas**: Check your connection string in `.env`

### Port 3000 Already in Use?
```bash
# Kill the process
npx kill-port 3000

# Then restart
npm run dev
```

### Need to Reinstall?
```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

---

## 📱 Access from Other Devices

The server is also available on your local network at:
```
http://10.179.133.164:3000
```

Use this to test on your phone or other devices on the same network!

---

## 🎨 Field Types Reference

| Type | Description | Example |
|------|-------------|---------|
| **text** | Single-line text | Name, Title, Description |
| **number** | Numeric values | Age, Price, Quantity |
| **email** | Email validation | user@example.com |
| **date** | Date picker | 2026-02-10 |
| **boolean** | Checkbox (Yes/No) | Active, Completed |
| **select** | Dropdown menu | Status, Category, Priority |

---

## 🚀 You're All Set!

**Your AI Form-to-App Builder is fully functional and ready to use!**

Open http://localhost:3000 and start building! 🎉
