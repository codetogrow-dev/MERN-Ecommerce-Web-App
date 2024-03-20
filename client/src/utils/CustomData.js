export const inventoryArray = [
    {
        title: "Pricing",
        icon: "fa-tag",
    },
    {
        title: "Restock",
        icon: "fa-cube",
    },
    {
        title: "Shipping",
        icon: "fa-truck",
    },
    {
        title: "Global Delivery",
        icon: "fa-globe",
    },
    {
        title: "Attributes",
        icon: "fa-sliders",
    },
];
export const deliveryArray = [
    {
        title: "World Wide Delivery",
        render: "Only available with Shipping method :",
        span: " Fulfilled by Phoenix"
    },
    {
        title: "Selected Countries",
        render: "FormInput",
        span: null
    },
    {
        title: "Local Delivery",
        render: "Deliver to your country of residence ",
        span: "Change profile address"
    }
]
export const PRODUCTS_COLUMNS = [
    {
        Header: "ID",
        accessor: "_id"
    },
    {
        Header: "Product Name",
        accessor: "title"
    },
    {
        Header: "Picture",
        accessor: "picture"
    },
    {
        Header: "Price",
        accessor: "salesPrice"
    },
    {
        Header: "Category",
        accessor: "categoryTitle"
    },
    {
        Header: "Tags",
        accessor: "tags"

    },
    {
        Header: "Vendor",
        accessor: "vendor"
    },
    {
        Header: "Published On",
        accessor: "createdAt"
    }
]