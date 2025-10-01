import prisma from "../libs/prisma";

export const createManyBlogItemsService = async () => {
    const items = await prisma.pagesItem.createMany({
        data: [
            {
                data: "January 3, 2023",
                title: "How to prepare a delicious gluten free sushi",
                image: "assets/images/sushi.png",
            },
            {
                data: "January 3, 2023",
                title: "Exclusive baking lessons from the pastry king",
                image: "assets/images/baking.png",
            },
            {
                data: "January 3, 2023",
                title: "How to prepare the perfect fries in an air fryer",
                image: "assets/images/air-fries.png",
            },
            {
                data: "January 3, 2023",
                title: "How to prepare delicious chicken tenders",
                image: "assets/images/nuggets.png",
            },
            {
                data: "January 3, 2023",
                title: "5 great cooking gadgets you can buy to save time",
                image: "assets/images/brownie.png",
            },
            {
                data: "January 3, 2023",
                title: "The secret tips & tricks to prepare a perfect burger",
                image: "assets/images/breakfast.png",
            },
            {
                data: "January 3, 2023",
                title: "7 delicious cheesecake recipes you can prepare",
                image: "assets/images/cheesecake.png",
            },
            {
                data: "January 3, 2023",
                title: "5 great pizza restaurants you should visit this city",
                image: "assets/images/pizza-girl.png",
            },
            {
                data: "January 3, 2023",
                title: "5 great cooking gadgets you can buy to save time",
                image: "assets/images/toast.png",
            },
            {
                data: "January 3, 2023",
                title: "How to prepare a delicious gluten free sushi",
                image: "assets/images/burrito.png",
            },
            {
                data: "January 3, 2023",
                title: "Top 20 simple and quick desserts for kids",
                image: "assets/images/ramen.png",
            },
            {
                data: "January 3, 2023",
                title: "Top 20 simple and quick desserts for kids",
                image: "assets/images/desserts.png",
            },
        ],
    });
    return items;
};

export const getManyBlogItemsService = async () => {
    const items = await prisma.pagesItem.findMany({});

    return items;
};
