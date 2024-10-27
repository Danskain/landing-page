import Link from "next/link";
import { Reveal } from "../Reveal";
import { useState, ChangeEvent, FormEvent } from "react";

interface FormData {
    nombre: string;
    apellido: string;
    cedula: string;
    departamento: string;
    ciudad: string;
    celular: string;
    correo: string;
    habeasData: boolean;
}

export function CtaDark() {
    const [formData, setFormData] = useState<FormData>({
        nombre: "",
        apellido: "",
        cedula: "",
        departamento: "",
        ciudad: "",
        celular: "",
        correo: "",
        habeasData: false,
    });
    const [codigoSorteo, setCodigoSorteo] = useState<string | null>(null);
    const [mensajeExito, setMensajeExito] = useState<string | null>(null);

    const departamentos = ["Antioquia", "Cundinamarca", "Valle del Cauca"];
    const ciudades: { [key: string]: string[] } = {
        Antioquia: ["Medellín", "Envigado", "Bello"],
        Cundinamarca: ["Bogotá", "Soacha", "Chía"],
        "Valle del Cauca": ["Cali", "Palmira", "Buenaventura"],
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" && "checked" in e.target ? (e.target as HTMLInputElement).checked : value,
        }));
    };

    const generarCodigoAleatorio = () => {
        const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let codigo = "";
        for (let i = 0; i < 8; i++) {
            codigo += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
        }
        return codigo;
    };

    const descargarCodigo = (codigo: string) => {
        const datos = `
            Nombre: ${formData.nombre}
            Apellido: ${formData.apellido}
            Cédula: ${formData.cedula}
            Departamento: ${formData.departamento}
            Ciudad: ${formData.ciudad}
            Celular: ${formData.celular}
            Correo Electrónico: ${formData.correo}
            Habeas Data: ${formData.habeasData ? "Sí" : "No"}
            Código de Sorteo: ${codigo}
        `;
        const blob = new Blob([datos], { type: "text/plain" });
        const enlaceDescarga = document.createElement("a");
        enlaceDescarga.href = URL.createObjectURL(blob);
        enlaceDescarga.download = "codigo-sorteo.txt";
        enlaceDescarga.click();
        URL.revokeObjectURL(enlaceDescarga.href);
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const nuevoCodigo = generarCodigoAleatorio();
        setCodigoSorteo(nuevoCodigo);
        descargarCodigo(nuevoCodigo);

        setMensajeExito("Usuario registrado con éxito");
        
        // Limpiar los campos del formulario
        setFormData({
            nombre: "",
            apellido: "",
            cedula: "",
            departamento: "",
            ciudad: "",
            celular: "",
            correo: "",
            habeasData: false,
        });

        // Eliminar el mensaje de éxito después de unos segundos
        setTimeout(() => setMensajeExito(null), 3000);
    };

    return (
        <div className="px-4 my-10 md:mt-20">
            <div className="max-w-3xl px-4 py-6 mx-auto bg-radialBlack md:px-12 md:py-8 shadow-dark rounded-xl">
                <div className="grid items-center gap-6 md:grid-cols-2">
                    <div>
                        <Reveal>
                            <h3 className="text-2xl font-bold ">Regístrate y participa por un descuento del 50% en tu nuevo coche</h3>
                        </Reveal>
                        <Reveal>
                            <p className="text-sm text-[#9CA6B1]">Todo lo que necesitas para aceptar el carro de tus sueños y hacer crecer tu pasión en cualquier parte del planeta</p>
                        </Reveal>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-2 text-sm">
                        <input
                            type="text"
                            name="nombre"
                            placeholder="Nombre"
                            required
                            value={formData.nombre}
                            onChange={handleChange}
                            className="w-full p-2 rounded-md border border-gray-300 text-[#9CA6B1] placeholder-[#9CA6B1]"
                        />
                        <input
                            type="text"
                            name="apellido"
                            placeholder="Apellido"
                            required
                            value={formData.apellido}
                            onChange={handleChange}
                            className="w-full p-2 rounded-md border border-gray-300 text-[#9CA6B1] placeholder-[#9CA6B1]"
                        />
                        <input
                            type="number"
                            name="cedula"
                            placeholder="Cédula"
                            required
                            value={formData.cedula}
                            onChange={handleChange}
                            className="w-full p-2 rounded-md border border-gray-300 text-[#9CA6B1] placeholder-[#9CA6B1]"
                        />
                        <select
                            name="departamento"
                            required
                            value={formData.departamento}
                            onChange={handleChange}
                            className="w-full p-2 rounded-md border border-gray-300 text-[#9CA6B1]"
                        >
                            <option value="">Selecciona un Departamento</option>
                            {departamentos.map((dep) => (
                                <option key={dep} value={dep}>{dep}</option>
                            ))}
                        </select>
                        {formData.departamento && (
                            <select
                                name="ciudad"
                                required
                                value={formData.ciudad}
                                onChange={handleChange}
                                className="w-full p-2 rounded-md border border-gray-300 text-[#9CA6B1]"
                            >
                                <option value="">Selecciona una Ciudad</option>
                                {ciudades[formData.departamento].map((ciudad) => (
                                    <option key={ciudad} value={ciudad}>{ciudad}</option>
                                ))}
                            </select>
                        )}
                        <input
                            type="tel"
                            name="celular"
                            placeholder="Celular"
                            required
                            value={formData.celular}
                            onChange={handleChange}
                            className="w-full p-2 rounded-md border border-gray-300 text-[#9CA6B1] placeholder-[#9CA6B1]"
                        />
                        <input
                            type="email"
                            name="correo"
                            placeholder="Correo Electrónico"
                            required
                            value={formData.correo}
                            onChange={handleChange}
                            className="w-full p-2 rounded-md border border-gray-300 text-[#9CA6B1] placeholder-[#9CA6B1]"
                        />
                        <div className="flex items-start space-x-2">
                            <input
                                type="checkbox"
                                name="habeasData"
                                required
                                checked={formData.habeasData}
                                onChange={handleChange}
                                className="mt-1"
                            />
                            <label className="text-xs text-[#9CA6B1]">
                                Autorizo el tratamiento de mis datos de acuerdo con la finalidad establecida en la política de protección de datos personales.
                            </label>
                        </div>

                        <div className="flex justify-center mt-4">
                            <button type="submit" className="px-6 py-2 rounded-md bg-blueRadial text-white">
                                Registrate
                            </button>
                        </div>
                    </form>
                    {mensajeExito && (
                        <p className="mt-4 text-center text-sm text-green-500">
                            {mensajeExito}
                        </p>
                    )}
                    {codigoSorteo && (
                        <p className="mt-4 text-center text-sm ">
                            ¡Tu código de sorteo es: <strong>{codigoSorteo}</strong>
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}





