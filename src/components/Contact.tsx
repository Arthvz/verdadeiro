'use client';

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Mail, Send } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

const WHATSAPP_NUMBER = "+5511963129841";

// Interface removida - não precisamos mais de países

// Opções de assunto
const subjects = [
    { id: "projeto", label: "Desenvolvimento de Projeto" },
    { id: "vaga", label: "Oportunidade de Vaga" },
    { id: "freelance", label: "Trabalho Freelance" },
    { id: "consultoria", label: "Consultoria Técnica" },
    { id: "parcerias", label: "Parcerias" },
    { id: "duvidas", label: "Dúvidas Técnicas" },
    { id: "outros", label: "Outros" },
];

export default function Contact() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        subjects: [] as string[],
        message: "",
    });
    const [sending, setSending] = useState(false);
    const [sent, setSent] = useState(false);
    const [error, setError] = useState("");
    const [isDark, setIsDark] = useState(false);

    // Detectar mudanças de tema
    useEffect(() => {
        const updateTheme = () => {
            setIsDark(document.documentElement.classList.contains('dark'));
        };

        updateTheme();
        const observer = new MutationObserver(updateTheme);
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class'],
        });

        return () => observer.disconnect();
    }, []);

    // Simulação de envio de e-mail (substitua por integração real se desejar)
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSending(true);
        setError("");
        try {
            const selectedSubjects = form.subjects.length > 0
                ? subjects.filter(s => form.subjects.includes(s.id)).map(s => s.label).join(", ")
                : "Não especificado";

            const emailBody = `${form.message}

---
Informações do contato:
Nome: ${form.name}
Email: ${form.email}
Assunto(s): ${selectedSubjects}`;

            window.location.href = `mailto:arthur.verdadeiro@outlook.com?subject=Contato de ${encodeURIComponent(
                form.name
            )} - ${encodeURIComponent(selectedSubjects)}&body=${encodeURIComponent(emailBody)}`;
            setSent(true);
        } catch (err) {
            setError("Erro ao enviar. Tente novamente.");
        } finally {
            setSending(false);
        }
    };

    const handleSubjectChange = (subjectId: string, checked: boolean) => {
        setForm(prev => ({
            ...prev,
            subjects: checked
                ? [...prev.subjects, subjectId]
                : prev.subjects.filter(id => id !== subjectId)
        }));
    };

    return (
        <section
            id="contact"
            className="min-h-screen flex items-center justify-center px-4 sm:px-6 py-16 sm:py-24"
        >
            <div className="max-w-4xl mx-auto w-full">
                <div className="text-center mb-8 sm:mb-12">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-foreground">
                        Entre em contato
                    </h2>
                    <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
                        Tem alguma dúvida sobre desenvolvimento ou quer discutir um projeto?
                        Estou aqui para ajudar. Entre em contato e vamos conversar!
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
                    {/* Formulário */}
                    <div className="bg-card border border-border rounded-lg p-6 sm:p-8 shadow-lg transition-colors duration-300">
                        <h3 className="text-lg sm:text-xl font-semibold mb-6 text-foreground">Envie uma mensagem</h3>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 gap-4">
                                <div>
                                    <Label htmlFor="name" className="text-foreground mb-2 block text-sm sm:text-base">Nome *</Label>
                                    <Input
                                        id="name"
                                        required
                                        value={form.name}
                                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                                        placeholder="Seu nome completo"
                                        className="h-10 sm:h-12"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="email" className="text-foreground mb-2 block text-sm sm:text-base">Email *</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        required
                                        value={form.email}
                                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                                        placeholder="seu@email.com"
                                        className="h-10 sm:h-12"
                                    />
                                </div>
                            </div>

                            {/* Assuntos */}
                            <div>
                                <Label className="text-foreground mb-3 block text-sm sm:text-base">Assunto da mensagem *</Label>
                                <div className="grid grid-cols-1 gap-3">
                                    {subjects.map((subject) => (
                                        <div key={subject.id} className="flex items-center space-x-2">
                                            <Checkbox
                                                id={subject.id}
                                                checked={form.subjects.includes(subject.id)}
                                                onCheckedChange={(checked) =>
                                                    handleSubjectChange(subject.id, checked as boolean)
                                                }
                                            />
                                            <Label
                                                htmlFor={subject.id}
                                                className="text-xs sm:text-sm font-normal cursor-pointer"
                                            >
                                                {subject.label}
                                            </Label>
                                        </div>
                                    ))}
                                </div>
                                {form.subjects.length === 0 && (
                                    <p className="text-xs text-muted-foreground mt-1">
                                        Selecione pelo menos um assunto
                                    </p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="message" className="text-foreground mb-2 block text-sm sm:text-base">Mensagem *</Label>
                                <Textarea
                                    id="message"
                                    required
                                    value={form.message}
                                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                                    placeholder="Descreva detalhadamente seu projeto, necessidade ou dúvida..."
                                    className="min-h-24 sm:min-h-32 resize-none text-sm sm:text-base"
                                />
                            </div>

                            <Button
                                type="submit"
                                disabled={sending || form.subjects.length === 0}
                                className="w-full h-10 sm:h-12 bg-primary text-primary-foreground hover:bg-primary/90 font-medium disabled:opacity-50 text-sm sm:text-base"
                            >
                                {sending ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                        Enviando...
                                    </>
                                ) : (
                                    <>
                                        <Send className="w-4 h-4 mr-2" />
                                        Enviar mensagem
                                    </>
                                )}
                            </Button>

                            {sent && (
                                <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                                    <p className="text-green-800 dark:text-green-200 text-sm">
                                        ✅ Redirecionando para seu aplicativo de e-mail...
                                    </p>
                                </div>
                            )}

                            {error && (
                                <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                                    <p className="text-red-800 dark:text-red-200 text-sm">
                                        ❌ {error}
                                    </p>
                                </div>
                            )}
                        </form>
                    </div>

                    {/* Informações de contato */}
                    <div className="space-y-6 sm:space-y-8">
                        <div>
                            <h3 className="text-lg sm:text-xl font-semibold mb-6 text-foreground">Outras formas de contato</h3>

                            <div className="space-y-4 sm:space-y-6">
                                {/* WhatsApp */}
                                <a
                                    href={`https://wa.me/${WHATSAPP_NUMBER}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-card border border-border rounded-lg hover:bg-accent transition-colors group"
                                >
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-500 text-white rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <FaWhatsapp className="w-5 h-5 sm:w-6 sm:h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-foreground text-sm sm:text-base">WhatsApp</h4>
                                        <p className="text-xs sm:text-sm text-muted-foreground">Resposta rápida via chat</p>
                                    </div>
                                </a>

                                {/* Email */}
                                <a
                                    href="mailto:arthur.verdadeiro@outlook.com"
                                    className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-card border border-border rounded-lg hover:bg-accent transition-colors group"
                                >
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500 text-white rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-foreground text-sm sm:text-base">Email</h4>
                                        <p className="text-xs sm:text-sm text-muted-foreground">arthur.verdadeiro@outlook.com</p>
                                    </div>
                                </a>

                                {/* LinkedIn */}
                                <a
                                    href="https://linkedin.com/in/arthur-verdadeiro"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-card border border-border rounded-lg hover:bg-accent transition-colors group"
                                >
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 text-white rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-foreground text-sm sm:text-base">LinkedIn</h4>
                                        <p className="text-xs sm:text-sm text-muted-foreground">Vamos nos conectar!</p>
                                    </div>
                                </a>
                            </div>
                        </div>

                        {/* Tempo de resposta */}
                        <div className="p-4 sm:p-6 bg-primary/10 border border-primary/20 rounded-lg">
                            <h4 className="font-semibold text-foreground mb-2 text-sm sm:text-base">⏱️ Tempo de resposta</h4>
                            <p className="text-xs sm:text-sm text-muted-foreground">
                                Geralmente respondo em até 24 horas. Para urgências,
                                prefira o WhatsApp para uma resposta mais rápida.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}