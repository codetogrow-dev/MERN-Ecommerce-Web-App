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
        Header: "Sr. No",
        accessor: (_, index) => index + 1,
        disableFilters: false
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
];
export const CUSTOMER_ROUTES = [
    {
        title: "Home",
        navigate: "/customer/home"
    },
    {
        title: "Products",
        navigate: "/customer/products"
    },
    {
        title: "Wishlist",
        navigate: "/customer/wishlist"
    },
    {
        title: "Carts",
        navigate: "/customer/carts"
    },
    {
        title: "Shipping Info",
        navigate: "/customer/shipping-info"
    },
    {
        title: "Orders",
        navigate: "/customer/orders"
    },
    {
        title: "Track Order",
        navigate: "/customer/track-order"
    },
    {
        title: "Checkout",
        navigate: "/customer/checkout"
    },
]
export const WISHLIST_TABLE_DATA = [
    {
        header: "Picture",
        field: "picture",
    },
    {
        header: "Product Name",
        field: "title",
    },
    {
        header: "Regular Price",
        field: "regularPrice",
    },
    {
        header: "Sales Price",
        field: "salesPrice",
    },
    {
        header: "Category",
        field: "categoryTitle",
    },
    {
        header: "Stock Quantity",
        field: "stockQuantity",
    },
    {
        header: "Delete",
        field: "icon",
    },
    {
        header: "Add To Cart",
        field: "button",
    },
];
export const PRODUCT_DETAILS_DATA = [
    {
        title: "Description",
        route: "description"
    },
    {
        title: "Review and Rating",
        route: "ratings"
    }
]