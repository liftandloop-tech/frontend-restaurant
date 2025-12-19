// This file contains static data for the menu items.
// Separating data from the component makes the code cleaner and easier to manage.

export const menuItemsData = {
  starters: [
    {
      name: "Caesar Salad",
      description: "Fresh romaine, parmesan, croutons",
      price: 12.99,
      type: "veg",
    },
    {
      name: "Buffalo Wings",
      description: "Spicy buffalo sauce, celery sticks",
      price: 14.99,
      type: "non-veg",
    },
    {
      name: "Bruschetta",
      description: "Toasted bread, tomato, basil",
      price: 9.99,
      type: "veg",
    },
    {
      name: "Mozzarella Sticks",
      description: "Crispy breaded mozzarella",
      price: 11.99,
      type: "veg",
    },
  ],
  mains: [
    {
      name: "Spaghetti Carbonara",
      description: "Pasta with eggs, cheese, bacon",
      price: 18.99,
      type: "non-veg",
    },
    {
      name: "Margherita Pizza",
      description: "Tomato, mozzarella, basil",
      price: 16.99,
      type: "veg",
    },
  ],
  desserts: [
    {
      name: "Tiramisu",
      description: "Coffee-flavoured Italian dessert",
      price: 8.99,
      type: "veg",
    },
  ],
  drinks: [
    {
      name: "Coca-Cola",
      description: "Classic coke",
      price: 3.99,
      type: "veg",
    },
  ],
};
