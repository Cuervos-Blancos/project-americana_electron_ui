import styles from "./styles/editor.module.css";
import { PeticionApi } from "../services/Api.js";
import { useState } from "react";

export default function Editor({ texto }) {
    const [respuestaPeticion , setRespuestaPeticion] = useState();
	const handleClick = async () => {
        const respuesta = await PeticionApi(`/recibos/${texto}`);
        console.log(respuesta);
        setRespuestaPeticion(respuesta);

    };

	return (
		<div className={styles.Editor}>
			<div className="">
				<h1>{texto}</h1>
				<p>
					EDITOR: logs - Jhon Doe 123345 correo@email.com Now()
					Enviado OK{" "}
				</p>
                <h1>Respuesta</h1>
                {respuestaPeticion}
			</div>
			<div className="">
				<button onClick={handleClick}>Obtener Datos</button>
				<p>Footbar: Correos enviados n de m</p>
			</div>
		</div>
	);
}
