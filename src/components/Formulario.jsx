import { TextField, MenuItem, FormControl } from "@mui/material";
import { useEffect, useState } from "react";
import { PeticionApi } from "../services/Api.js";
import styles from "./styles/formulario.module.css";

export default function Formulario({ FuncSetCadenaUrl }) {
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

	/* Enabled Filtros */
	/* Lo primero a filtrar es el ciclo escolar */
	const [disableCarreras, setDisableCarreras] = useState(true);
	const [disableGrupos, setDisabledGrupos] = useState(true);
	const [disableMeses, setDisableMeses] = useState(true);

	const [ciclo, setCiclo] = useState("");
	const [carrera, setCarrera] = useState("");
	const [grupo, setGrupo] = useState("");
	const [mes, setMes] = useState("");

	/* Data field ciclos */
	const HandleCiclo = async (event) => {
		setCiclo(event.target.value);
		setDisableCarreras(false);

		if (carrera !== "") {
			setCarrera("");
			setGrupo("");
			setMes("");

			//disableCarreras(true);
			setDisabledGrupos(true);
			setDisableMeses(true);
		}
	};

	const SetCiclos = async () => {
		const respuestaCiclos = await PeticionApi("/datafields/ciclos");
		setSelectCiclos(respuestaCiclos);
	};
	/* Al cargar la aplicacion se carga el datafield de ciclos */
	useEffect(() => {
		SetCiclos();
	}, []);

	/* Datafield Carrera */
	const HandleCarrera = (event) => {
		setCarrera(event.target.value);
		setDisabledGrupos(false);

		if (grupo !== "") {
			setGrupo("");
			setMes("");

			setDisableMeses(true);
		}
	};

	const PeticionCarrera = async (ciclos) => {
		const respuestaCarreras = await PeticionApi(
			`/datafields/carreras/${ciclos}`
		);
		//console.log(respuestaCarreras);
		setSelectCarreras(respuestaCarreras);
	};
	/* Si se cambia el valor del data field ciclo, se actualiza el data field carrera */
	useEffect(() => {
		if (ciclo === "") return;
		PeticionCarrera(ciclo);
	}, [ciclo]);

	/* Datafield Grupo */
	const HandleGrupo = (event) => {
		setGrupo(event.target.value);
		setDisableMeses(false);

		if (mes !== "") {
			setMes("");
		}
	};

	const PeticionGrupo = async (periodo, nivel) => {
		const respuestaGrupos = await PeticionApi(
			`/datafields/grupos/${periodo}/${nivel}`
		);
		//console.log(respuestaGrupos);
		setSelectGrupos(respuestaGrupos);
	};

	useEffect(() => {
		if (ciclo === "" || carrera === "") return;
		PeticionGrupo(ciclo, carrera);
	}, [ciclo, carrera]);

	/* Datafield Mes */
	const HandleMes = (event) => {
		setMes(event.target.value);
	};

	const PeticionMes = async () => {
		const respuestaMes = await PeticionApi(`/datafields/meses`);
		//console.log(respuestaMes);
		setSelectMeses(respuestaMes.mes);
	};

	useEffect(() => {
		if (grupo === "") return;
		PeticionMes();
	},[grupo]);

	const handleClick = () => {
		const cadena = `${carrera}/${grupo}/${ciclo}/${mes}`;
		FuncSetCadenaUrl(cadena);
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
						<MenuItem value={5000}>5 segundos</MenuItem>
						<MenuItem value={10000}>10 segundos</MenuItem>
						<MenuItem value={15000}>15 segundos</MenuItem>
						<MenuItem value={30000}>30 segundos</MenuItem>
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
						label="Ciclos"
						value={ciclo}
						onChange={HandleCiclo}
						disabled={false}
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
						label="Carrera"
						value={carrera}
						onChange={HandleCarrera}
						disabled={disableCarreras}
					>
						{selectCarreras.map((item, index) => (
							<MenuItem key={index} value={item.nivel}>
								{item.nivel}
							</MenuItem>
						))}
					</TextField>

					<TextField
						select
						required
						label="Grupo"
						value={grupo}
						onChange={HandleGrupo}
						disabled={disableGrupos}
					>
						{selectGrupos.map((item) => (
							<MenuItem
								key={item.codigogrupo}
								value={item.codigogrupo}
							>
								{item.codigogrupo}
							</MenuItem>
						))}
					</TextField>

					<TextField
						select
						required
						label="Mes"
						value={mes}
						onChange={HandleMes}
						disabled={disableMeses}
					>
						{selectMeses.map((item) => (
							<MenuItem key={item} value={item}>
								{Meses[item]}
							</MenuItem>
						))}
					</TextField>
				</FormControl>
			</div>
			{/* Footbar */}
			<div className="">
				<button onClick={handleClick}>Ver alumnos</button>
			</div>
		</div>
	);
}
