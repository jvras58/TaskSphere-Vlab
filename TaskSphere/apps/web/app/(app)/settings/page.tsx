import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Perfil",
};

export default function SettingsPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-teal-50 font-sans">
      <div className="bg-white p-10 rounded-2xl shadow-xl text-center">
        <h1 className="text-4xl font-bold text-indigo-600 mb-2">Hello, World!</h1>
        <p className="text-slate-700 text-lg">
          Bem-vindo à página de configurações do seu perfil.
        </p>
      </div>
    </div>
  );
}