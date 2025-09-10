import prisma from "../libs/prisma";

export const createManyMenuItensService = async () => {
    await prisma.menuItem.createMany({
        data: [
            {
                name: "Fried Eggs",
                description:
                    "Made with eggs, lettuce, salt, oil, and other ingredients.",
                price: 9.99,
                image: "assets/images/fried-eggs.png",
                category: "breakfast",
            },
            {
                name: "Hawaiian Pizza",
                description:
                    "Made with eggs, lettuce, salt, oil, and other ingredients.",
                price: 15.99,
                image: "assets/images/pizzas.png",
                category: "mainDishes",
            },
            {
                name: "Martinez Cocktail",
                description:
                    "Made with eggs, lettuce, salt, oil, and other ingredients.",
                price: 7.25,
                image: "assets/images/vine.png",
                category: "drinks",
            },
            {
                name: "Butterscotch Cake",
                description:
                    "Made with eggs, lettuce, salt, oil, and other ingredients.",
                price: 20.99,
                image: "assets/images/pie.png",
                category: "desserts",
            },
            {
                name: "Mint Lemonade",
                description:
                    "Made with eggs, lettuce, salt, oil, and other ingredients.",
                price: 5.89,
                image: "assets/images/soda.png",
                category: "drinks",
            },
            {
                name: "Chocolate Icecream",
                description:
                    "Made with eggs, lettuce, salt, oil, and other ingredients.",
                price: 18.05,
                image: "assets/images/gelato.png",
                category: "desserts",
            },
            {
                name: "Cheese Burger",
                description:
                    "Made with eggs, lettuce, salt, oil, and other ingredients.",
                price: 12.55,
                image: "assets/images/burguer.png",
                category: "mainDishes",
            },
            {
                name: "Classic Waffles",
                description:
                    "Made with eggs, lettuce, salt, oil, and other ingredients.",
                price: 12.99,
                image: "assets/images/pancakes.png",
                category: "breakfast",
            },
        ],
    });
};

export const getMenuItemsService = async (category) => {
    const items = await prisma.menuItem.findMany({
        where: category ? { category: category } : {},
    });

    return items;
};
