import { useCart } from "../../context/CartContext";
import IconsButton from "../layout/IconsButton";

const deleteIcon = () =>
(
    <svg id="garbage-can-01H268DYVE73WH4SY1Y0A58P3J" width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.25 7.75V12.25M1 4H14.5H1ZM13 4V14.5C13 14.8978 12.842 15.2794 12.5607 15.5607C12.2794 15.842 11.8978 16 11.5 16H4C3.60218 16 3.22064 15.842 2.93934 15.5607C2.65804 15.2794 2.5 14.8978 2.5 14.5V4H13ZM4.75 4V2.5C4.75 2.10218 4.90804 1.72064 5.18934 1.43934C5.47064 1.15804 5.85218 1 6.25 1H9.25C9.64782 1 10.0294 1.15804 10.3107 1.43934C10.592 1.72064 10.75 2.10218 10.75 2.5V4H4.75ZM6.25 7.75V12.25V7.75Z" stroke-width="1.125" stroke-linecap="round" stroke-linejoin="round" stroke="#545454"></path></svg>
);

const aumentarIcon = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="inherit" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="zds-quantity-selector__icon" focusable="false"><path d="M12.5 11.5V5H11.5V11.5H5V12.5H11.5V19H12.5V12.5H19V11.5H12.5Z" fill="inherit"></path></svg>
);

const disminuirIcon = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="inherit" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="zds-quantity-selector__icon" focusable="false"><path fill-rule="evenodd" clip-rule="evenodd" d="M19 12.5L5 12.5V11.5L19 11.5V12.5Z" fill="inherit"></path></svg>
);
const CartProducto = ({ item }) => {
    const { updateQuantity, removeFromCart } = useCart();
    return (
        <div key={item.id} className="flex items-center justify-center gap-4  ">
            <div className="flex items-center  w-16 h-16 p-1">
                <img
                    src={item.imagen_url}
                    alt={item.nombre}
                    className="object-contain w-16 h-16"
                />
            </div>


            <div className="flex justify-between w-full  items-center ">
                <div className="flex-col flex-grow ">

                    <p className="font-chronicle font-medium">{item.nombre}</p>
                    <div className="flex items-center gap-15 mt-1">
                        <div className="flex  items-center gap-5 border border-b-[1px]">

                            <IconsButton Icon={disminuirIcon} onClick={() => updateQuantity(item.id, Math.max(Number(item.cantidad) - 1, 1))} className="px-2  " />

                            <span>{item.cantidad}</span>
                            <IconsButton Icon={aumentarIcon} onClick={() => updateQuantity(item.id, Number(item.cantidad + 1))} className="px-2  " />
                        </div>

                    </div>
                </div>
                <div className="flex flex-col items-end  whitespace-nowrap ">
                    <p className="text-xs text-black font-halis">${item.precio_unitario}</p>
                    <IconsButton Icon={deleteIcon} onClick={() => removeFromCart(item.id)} className="" />

                </div>
            </div>


        </div>

    );
};

export default CartProducto;