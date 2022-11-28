import { Container } from "./components/Container";
import Formulario from "./components/Formulario";
import Editor from "./components/Editor";
import { useState, useEffect } from "react";
import { PeticionApi } from "./services/Api";

function App() {
	const [cadenaurl, setCadenaUrl] = useState("");
	const [datosAlumnos, setDatosAlumnos] = useState([]);

	const FuncSetCadenaUrl = async (cadena) => {
		const respuestaTicket = await PeticionApi(`/recibos/${cadena}`);
		//console.log(respuestaTicket);
		setDatosAlumnos(respuestaTicket);
		//console.log(datosAlumnos);
	};
	useEffect(() => {
		if (cadenaurl === "") return;
		FuncSetCadenaUrl(cadenaurl);
	}, [cadenaurl]);

	return (
		<div>
			<Container>
				<Formulario FuncSetCadenaUrl={setCadenaUrl} />
				<Editor datosAlumnos={datosAlumnos} />
			</Container>
		</div>
	);
}

export default App;
