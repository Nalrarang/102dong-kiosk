export enum ProductType {
  BASIC = "BASIC",
  EXTRA = "EXTRA",
}

export const Product = [
  {
    type: ProductType.EXTRA,
    title: "배추김치",
    menu_price: "1kg 8000원",
    price: 800,
    image: require("../assets/images/1.png"),
    options: ["weight", "container_exclude"],
  },
  {
    type: ProductType.EXTRA,
    title: "알타리",
    menu_price: "1kg 10000원",
    price: 1000,
    image: require("../assets/images/2.png"),
    options: ["weight", "container_exclude"],
  },
  {
    type: ProductType.EXTRA,
    title: "쪽파/갓김치",
    menu_price: "1kg 15000원",
    price: 1500,
    image: require("../assets/images/3.png"),
    options: ["weight"],
  },
  {
    type: ProductType.BASIC,
    title: "스티로폼상자",
    menu_price: "3000원",
    price: 3000,
    image: require("../assets/images/4.png"),
    options: [],
  },
  {
    type: ProductType.BASIC,
    title: "고무장갑",
    menu_price: "3000원",
    price: 3000,
    image: require("../assets/images/5.png"),
    options: [],
  },
  {
    type: ProductType.BASIC,
    title: "택배비",
    menu_price: "5000원",
    price: 5000,
    image: require("../assets/images/6.png"),
    options: [],
  },
];

export const Other = [
  {
    type: ProductType.BASIC,
    title: "강원도 막장",
    menu_price: "1kg 18000원",
    price: 18000,
    image: require("../assets/images/7.png"),
    options: [],
  },
  {
    type: ProductType.BASIC,
    title: "이로운 고추장",
    menu_price: "1kg 25000원",
    price: 25000,
    image: require("../assets/images/8.png"),
    options: [],
  },
  {
    type: ProductType.BASIC,
    title: "이로운 된장",
    menu_price: "1kg 18000원",
    price: 18000,
    image: require("../assets/images/9.png"),
    options: [],
  },
];
