# Sample App Schemas

Copy and paste these into the form builder for quick testing!

---

## 1. Employee Manager

**App Name:** Employee Manager
**Collection Name:** employees

### Fields:
1. firstName - text - required
2. lastName - text - required
3. email - email - required
4. phone - text - not required
5. department - select - required - Options: `Engineering,Sales,Marketing,HR,Finance`
6. position - text - required
7. salary - number - not required
8. startDate - date - required
9. isActive - boolean - not required

---

## 2. Task Manager

**App Name:** Task Manager
**Collection Name:** tasks

### Fields:
1. title - text - required
2. description - text - not required
3. priority - select - required - Options: `Low,Medium,High,Urgent`
4. status - select - required - Options: `Todo,In Progress,Review,Done`
5. dueDate - date - not required
6. assignee - text - not required
7. completed - boolean - not required

---

## 3. Product Inventory

**App Name:** Product Inventory
**Collection Name:** products

### Fields:
1. productName - text - required
2. sku - text - required
3. description - text - not required
4. category - select - required - Options: `Electronics,Clothing,Food,Books,Other`
5. price - number - required
6. quantity - number - required
7. supplier - text - not required
8. inStock - boolean - not required
9. lastRestocked - date - not required

---

## 4. Student Records

**App Name:** Student Records
**Collection Name:** students

### Fields:
1. firstName - text - required
2. lastName - text - required
3. studentId - text - required
4. email - email - required
5. grade - select - required - Options: `A,B,C,D,F`
6. major - text - not required
7. enrollmentDate - date - required
8. gpa - number - not required
9. isActive - boolean - not required

---

## 5. Event Planner

**App Name:** Event Planner
**Collection Name:** events

### Fields:
1. eventName - text - required
2. description - text - not required
3. eventDate - date - required
4. location - text - required
5. organizer - text - required
6. attendees - number - not required
7. status - select - required - Options: `Planned,Confirmed,In Progress,Completed,Cancelled`
8. budget - number - not required
9. isPublic - boolean - not required

---

## 6. Contact Manager

**App Name:** Contact Manager
**Collection Name:** contacts

### Fields:
1. name - text - required
2. email - email - required
3. phone - text - not required
4. company - text - not required
5. position - text - not required
6. category - select - required - Options: `Client,Vendor,Partner,Employee,Other`
7. notes - text - not required
8. lastContact - date - not required
9. isActive - boolean - not required

---

## 7. Book Library

**App Name:** Book Library
**Collection Name:** books

### Fields:
1. title - text - required
2. author - text - required
3. isbn - text - not required
4. genre - select - required - Options: `Fiction,Non-Fiction,Science,History,Biography,Other`
5. publishDate - date - not required
6. pages - number - not required
7. publisher - text - not required
8. isAvailable - boolean - not required

---

## 8. Restaurant Menu

**App Name:** Restaurant Menu
**Collection Name:** menuItems

### Fields:
1. dishName - text - required
2. description - text - not required
3. category - select - required - Options: `Appetizer,Main Course,Dessert,Beverage,Side Dish`
4. price - number - required
5. ingredients - text - not required
6. spicyLevel - select - not required - Options: `Mild,Medium,Hot,Extra Hot`
7. isVegetarian - boolean - not required
8. isAvailable - boolean - not required

---

## 9. Gym Membership

**App Name:** Gym Membership
**Collection Name:** members

### Fields:
1. firstName - text - required
2. lastName - text - required
3. email - email - required
4. phone - text - required
5. membershipType - select - required - Options: `Basic,Premium,VIP`
6. joinDate - date - required
7. expiryDate - date - required
8. monthlyFee - number - required
9. isActive - boolean - not required

---

## 10. Bug Tracker

**App Name:** Bug Tracker
**Collection Name:** bugs

### Fields:
1. title - text - required
2. description - text - required
3. severity - select - required - Options: `Low,Medium,High,Critical`
4. status - select - required - Options: `Open,In Progress,Testing,Resolved,Closed`
5. reportedBy - text - required
6. assignedTo - text - not required
7. reportedDate - date - required
8. resolvedDate - date - not required
9. isReproducible - boolean - not required

---

## Quick Copy Template

```
App Name: [Your App Name]
Collection Name: [collection_name]

Field 1: fieldName - type - required/not required - [Options if select]
Field 2: ...
```

---

**Tip:** Start with a simple app (3-4 fields) to test the system, then create more complex ones!
