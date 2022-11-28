import styles from "./styles/editor.module.css";
import { useState, useEffect } from "react";
import { DatosAlumno } from "./DatosAlumno";

export default function Editor({ datosAlumnos }) {
	const [alumnos, setAlumnos] = useState([]);

	useEffect(() => {
		setAlumnos(datosAlumnos);
	}, [datosAlumnos]);

	return (
		<div className={styles.Editor}>
			<div className="">
				{alumnos.map((alumno) => (
					<>
						<DatosAlumno
							key={alumno.numeroalumno}
							nombreCompleto={
								alumno.nombre +
								" " +
								alumno.paterno +
								" " +
								alumno.materno
							}
							numeroAlumno={alumno.numeroalumno}
							grupo={alumno.codigogrupo}
							carrera={alumno.nivel}
							fechaPronto={alumno.fecha_sp1}
							fechaAtrasado={alumno.fecha_sp2}
							referenciaPronto={alumno.referencia}
							referenciaAtrasado={alumno.referencia2}
							cantidadProgramada={alumno.cantidadprogramada}
							enviado={false}
						/>
						<hr class="rounded" />
					</>
				))}
			</div>
			{/* <div className="">
				<button onClick={handleClick}>Obtener Datos</button>
				<p>Footbar: Correos enviados n de m</p>
			</div> */}
		</div>
	);
}
