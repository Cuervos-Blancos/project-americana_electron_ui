import { TextField, MenuItem, FormControl } from "@mui/material";
import { useEffect, useState } from "react";
import { PeticionApi } from "../services/Api.js";
import styles from "./styles/formulario.module.css";

export default function Formulario({parametros}) {
	const Meses = {
		5: "Enero",
		6: "Febrero",
		7: "Marzo",
		8: "Abril",
		9: "Mayo",
		10: "Junio",
		11: "Julio",
		12: "Agosto",
		1: "Septiembre",
		2: "Octubre",
		3: "Noviembre",
		4: "Diciembre",
	};

	/* Administrador */
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [puerto, setPuerto] = useState("");
	const [tiempoEnvio, setTiempoEnvio] = useState("");

	const HandleEmail = (event) => {
		setEmail(event.target.value);
	};

	const HandlePassword = (event) => {
		setPassword(event.target.value);
	};

	const HandlePuerto = (event) => {
		setPuerto(event.target.value);
	};

	const HandleTiempoEnvio = (event) => {
		setTiempoEnvio(event.target.value);
	};

	/* Filtros */

	const [selectCarreras, setSelectCarreras] = useState([]);
	const [selectCiclos, setSelectCiclos] = useState([]);
	const [selectGrupos, setSelectGrupos] = useState([]);
	const [selectMeses, setSelectMeses] = useState([]);

	const SetFiltros = async () => {
		const respuesta = await PeticionApi("/datafields/");
		setSelectMeses(respuesta.mes);
		setSelectGrupos(respuesta.codigogrupo);
		setSelectCarreras(respuesta.nivel);
		setSelectCiclos(respuesta.codigo_corto);
	};

	const [carrera, setCarrera] = useState("");
	const [ciclo, setCiclo] = useState("");
	const [mes, setMes] = useState("");
	const [grupo, setGrupo] = useState("");

	const HandleCarrera = (event) => {
		setCarrera(event.target.value);
	};

	const HandleCiclo = (event) => {
		setCiclo(event.target.value);
	};

	const HandleMes = (event) => {
		setMes(event.target.value);
	};

	const HandleGrupo = (event) => {
		setGrupo(event.target.value);
	};

	useEffect(() => {
		SetFiltros();
	}, []);

	const handleClick = () => {
		const cadena = `/${carrera}/${grupo}/${ciclo}/${mes}`
		parametros(cadena);

		/* console.log("ADMINISTRADOR ----------------")
		console.log(email);
		console.log(password);
		console.log(puerto);
		console.log(tiempoEnvio);
		console.log("FILTROS -------------------")
		console.log(carrera);
		console.log(ciclo);
		console.log(mes);
		console.log(grupo); */
	};

	return (
		<div className={styles.Formulario}>
			{/* Administrador */}
			<div className="">
				<h2>Administrador</h2>
				<FormControl fullWidth>
					<TextField
						error={false}
						required
						type="email"
						label="E-Mail"
						value={email}
						onChange={HandleEmail}
					/>
					<TextField
						required
						type="password"
						label="Contraseña"
						value={password}
						onChange={HandlePassword}
					/>
					<TextField
						required
						label="Puerto"
						type="number"
						value={puerto}
						onChange={HandlePuerto}
					/>
					<TextField
						select
						required
						label="Tiempo de envio"
						value={tiempoEnvio}
						onChange={HandleTiempoEnvio}
					>
						<MenuItem value={1000}>1 segundo</MenuItem>
						<MenuItem value={30000}>30 segundos</MenuItem>
						<MenuItem value={60000}>1 minuto</MenuItem>
						<MenuItem value={180000}>3 minutos</MenuItem>
						<MenuItem value={300000}>5 minutos</MenuItem>
					</TextField>
				</FormControl>
			</div>
			{/* Filtros */}
			<div className="">
				<h2>Filtros</h2>
				<FormControl fullWidth>
					<TextField
						select
						required
						label="Carrera"
						value={carrera}
						onChange={HandleCarrera}
					>
						{selectCarreras.map((item, index) => (
							<MenuItem key={index} value={item}>
								{item}
							</MenuItem>
						))}
					</TextField>
					<TextField
						select
						required
						label="Ciclos"
						value={ciclo}
						onChange={HandleCiclo}
					>
						{selectCiclos.map((item, index) => (
							<MenuItem key={index} value={item.periodo}>
								{item.codigo_corto}
							</MenuItem>
						))}
					</TextField>
					<TextField
						select
						required
						label="Mes"
						value={mes}
						onChange={HandleMes}
					>
						{selectMeses.map((item) => (
							<MenuItem key={item} value={item}>
								{Meses[item]}
							</MenuItem>
						))}
					</TextField>
					<TextField
						select
						required
						label="Grupo"
						value={grupo}
						onChange={HandleGrupo}
					>
						{selectGrupos.map((item) => (
							<MenuItem key={item} value={item}>
								{item}
							</MenuItem>
						))}
					</TextField>
				</FormControl>
			</div>
			{/* Footbar */}
			<div className="">
				<button onClick={() => alert("funcion no implementada")}>
					Configuration
				</button>
				<button onClick={handleClick}>Enviar</button>
			</div>
		</div>
	);
}
