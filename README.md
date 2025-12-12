Ummumiy loyiha bo'yicha bir nechta olgan tajribalarim.

Ketgan vaqt: ummumiy 2-3 soat atrofida.
Qiyin bo'lgan joylarini pastda aytib o'tdim. Bularni hammasi App.jsx da
DEMO:

1 - challenge:

useEffect(() => {
window.addToCart = addToCart;
}, [addToCart]);

Codeni bu qismi bo'yicha qisqacha xulosam:

Meni qiynalgan joyim asosan shu joyi edi, buni ChatGPT dan so'radim va shu yechimni beridi va men buni sinab ko'rdim va o'xshadi.

Bu yerda men nimani tushundim, bu function bizga addToCart global qilib beradi, ya'ni windowga chiqarib beradi. Shundagini JS buni taniydi.

Agtgancha addToCart ni dependencyga berilganligi sababi agar bermasa bu bir marta ishlaydi va tugaydi. dependencyga bergan o'zgarish sezsa darrov yana ishga tushadi.

2 - challenge:

useEffect(() => {
import("./vanilla/products.js").then((module) => {
module.loadProducts();
});
}, []);

Bu function bo'yicha bir nechta fikrlarim:

Bu menga js hamma React componentlar render bo'gandan keyin ishlashi uchun kerak bo'ladi, va buni ham men GPT orqali bilib oldim, va amallda qo'llab ko'rdim. Natijada menda hammasi to'g'ri va aniq ishladi chunki bu function faqat bir marta ishlaydi, dependency yo'qligi sababli.

3 - foydali qismi
const addToCart = useCallback((item) => {
setCartItems((prevItems) => {
const existingItem = prevItems.find((i) => i.id === item.id);
if (existingItem) {
return prevItems.map((i) =>
i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
);
} else {
return [...prevItems, { ...item, quantity: 1 }];
}
});
}, []);

Bu function useCallback bilan o'ralgan nega chunki function re-render bo'lishi va optimization uchun ishlatilgan va bu orqali Reactda optimization qismini ancha tushundim qanday qilishni.

CSS qismiga o'tsak:

#products-grid {
display: grid;
grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
grid-template-rows: repeat(2, auto);
gap: 20px;
max-height: 500px;
overflow-y: auto;
}

Bu yerda GRID xususiyatidan foydalandim products ni tartibli va moslashuvchan qilish uchun.

Ummumiy xulosam:

Bu loyiha menga ancha katta yordam berdi Frontend skills rivojlantirishga va ko'p narsalarni o'rgandim qisqacha qilib aytganda sizlarga katta rahmat!
