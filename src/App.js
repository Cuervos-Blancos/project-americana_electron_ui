import { Container } from "./components/Container";
import Formulario from "./components/Formulario";
import Editor from "./components/Editor";
import { useState } from "react";

function App() {
	const [text, setText] = useState();

	const Parametros = (cadena) => {
		setText(cadena);
	};

	return (
		<div>
			<Container>
				<Formulario parametros={Parametros} />
				<Editor texto={text} />
			</Container>
		</div>
	);
}

export default App;
