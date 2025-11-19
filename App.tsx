// FIX: Added Dispatch and SetStateAction to correctly type the React state setter.
import React, { useState, createContext, useContext, useMemo, Dispatch, SetStateAction } from 'react';

// --- ASSETS ---
const mentorImageUrl = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/4QAiRXhpZgAATU0AKgAAAAgAAQESAAMAAAABAAEAAAAAAAD/2wBDAAIBAQIBAQICAgICAgICAwUDAwMDAwYEBAMFBwYHBwcGBwcICQsJCAgKCAcHCg0KCgsMDAwMBwkODw0MDgsMDAz/2wBDAQICAgMDAwYDAwYMCAcIDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAz/wAARCAJTApUDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1VXV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6ery8/T19vf4+fr/2gAMAwEAAhEDEQA/AP0BooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACii-";

const Logo: React.FC = () => (
    <svg width="170" height="40" viewBox="0 0 170 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21.25 25C21.25 29.8325 17.299 33.75 12.4219 33.75C7.54476 33.75 3.59375 29.8325 3.59375 25" stroke="#B0926A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M3.59375 25C3.59375 20.1675 7.54476 16.25 12.4219 16.25C17.299 16.25 21.25 20.1675 21.25 25" stroke="#4F4A45" strokeWidth="1.s" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M29.0625 25C29.0625 29.8325 25.1115 33.75 20.2344 33.75C15.3572 33.75 11.4062 29.8325 11.4062 25" stroke="#4F4A45" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M11.4062 25C11.4062 20.1675 15.3572 16.25 20.2344 16.25C25.1115 16.25 29.0625 20.1675 29.0625 25" stroke="#4F4A45" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <text fill="#4F4A45" fontFamily="Cormorant Garamond, serif" fontSize="18" fontWeight="600" letterSpacing="0.02em">
            <tspan x="40" y="27">School of Midlife</tspan>
        </text>
    </svg>
);


// --- TYPES & CONTENT ---
type Language = 'es' | 'en';
type View = 'main' | 'legal' | 'sales';

interface LegalPageContent {
    title: string;
    back_button: string;
    content: {
        heading?: string;
        text?: string;
        list?: string[];
    }[];
}

interface Content {
    nav: {
        school: string;
        programs: string;
        philosophy: string;
        contact: string;
    };
    hero: {
        subtitle: string;
        title: string;
        description: string;
        cta: string;
    };
    secondMountain: {
        title: string;
        p1: string;
        p2: string;
    };
    about: {
        title: string;
        p1: string;
        p2: string;
    };
    beforeAfter: {
        title: string;
        before: {
            title: string;
            items: string[];
        };
        after: {
            title: string;
            items: string[];
        };
    };
    programs: {
        title: string;
        subtitle: string;
        giro: {
            duration: string;
            title: string;
            subtitle: string;
            description: string;
            items: string[];
            footer: string;
        };
        camino: {
            duration: string;
            title: string;
            subtitle: string;
            description: string;
            items: string[];
            footer: string;
        };
    };
    philosophy: {
        title: string;
        items: {
            title: string;
            description: string;
        }[];
    };
    forWhom: {
        title: string;
        items: string[];
    };
    learn: {
        title: string;
        items: string[];
    };
    mentor: {
        title: string;
        name: string;
        description: string;
    };
    testimonials: {
        title: string;
        items: {
            name: string;
            role: string;
            quote: string;
        }[];
    };
    cta: {
        title: string;
        button: string;
    };
    footer: {
        legalNotice: string;
        salesPolicy: string;
        copy: string;
    };
    legalNoticePage: LegalPageContent;
    salesPolicyPage: LegalPageContent;
}

const contentData: Record<Language, Content> = {
    es: {
        nav: { school: "La Escuela", programs: "Programas", philosophy: "Filosofía", contact: "Contacta" },
        hero: { subtitle: "UNA NUEVA PERSPECTIVA PARA LA SEGUNDA MITAD DE LA VIDA", title: "Redescubre Tu Propósito.\nVive con Intención.", description: "School of Midlife es un programa transformador diseñado para mujeres que están listas para abrazar su próximo capítulo con claridad, confianza y alegría.", cta: "Saber Más" },
        secondMountain: { title: "Es Hora de Escalar Tu Segunda Montaña", p1: "La primera mitad de la vida a menudo se trata de construir: carrera, familia, identidad. Escalamos la montaña que la sociedad espera de nosotros. Pero, ¿qué sucede cuando llegas a la cima y descubres que la vista no es lo que esperabas?", p2: "La 'segunda montaña' se trata de encontrar un nuevo propósito, uno impulsado por valores internos, conexión y contribución. No se trata de lograr más, sino de vivir con más significado. Te guiamos en este nuevo ascenso." },
        about: { title: "¿Qué es la School of Midlife?", p1: "Es un espacio para la introspección, el aprendizaje y la comunidad. Combinamos metodologías de coaching probadas, prácticas de mindfulness y neurociencia para ayudarte a navegar los desafíos y oportunidades únicos de la mediana edad.", p2: "No se trata de 'anti-envejecimiento' o perseguir la juventud. Se trata de 'pro-envejecimiento': abrazar tu sabiduría, redefinir el éxito y crear una vida que sea auténticamente tuya." },
        beforeAfter: { title: "Tu Transformación", before: { title: "Antes", items: ["Sentirte estancada, insegura o invisible.", "Abrumada por las responsabilidades, sin tiempo para ti.", "Preguntándote '¿Esto es todo lo que hay?'", "Falta de claridad sobre tus próximos pasos.", "Sentirte desconectada de tu verdadero yo."] }, after: { title: "Después", items: ["Claridad sobre tu propósito y lo que realmente importa.", "Energía y entusiasmo renovados por la vida.", "Profunda confianza en ti misma y en tus decisiones.", "Conexiones significativas con mujeres de ideas afines.", "Un plan de acción práctico para tu próximo capítulo."] } },
        programs: {
            title: "Nuestros Programas",
            subtitle: "Elige el camino adecuado para ti. Ambos programas ofrecen una mezcla de coaching grupal, apoyo individual y herramientas prácticas.",
            giro: {
                duration: "3 MESES",
                title: "El Giro",
                subtitle: "Un programa de co-creación para mujeres que han decidido escucharse.",
                description: "Para mujeres que han decidido escucharse, dar un giro y perseguir sus sueños.",
                items: [
                    "Toma el control de tu vida y sal del piloto automático.",
                    "Aprende a aterrizar tu sueño en un proyecto tangible, con un método práctico paso a paso.",
                    "Dale un giro a tu mentalidad, siéntete orgullosa y apasionada.",
                    "Descubre la fuerza de tu sensibilidad para poner en marcha ese sueño que tanto te mueve.",
                    "Respira la paz que anhelas y da sentido a tu vida.",
                    "Organiza un plan concreto que te permitirá pasar a la acción y crear la vida que quieres vivir."
                ],
                footer: "Comienza tu viaje de redescubrimiento."
            },
            camino: {
                duration: "6 MESES",
                title: "El Camino",
                subtitle: "Una Transformación Profunda",
                description: "Una mentoría integral de 6 meses para mujeres listas para comprometerse a diseñar y vivir su obra maestra de la segunda mitad. Incluye todo lo de El Giro, y más.",
                items: ["Todo lo de El Giro, y además:", "Sesiones de coaching individuales mensuales", "Desarrollo de un plan de acción personalizado", "Talleres intensivos sobre temas específicos", "Acceso de por vida a nuestra comunidad"],
                footer: "Recorre el camino hacia tu vida más auténtica."
            }
        },
        philosophy: { title: "Nuestros Principios Rectores", items: [{ title: "Sabiduría Interior", description: "Creemos que ya tienes las respuestas. Nuestro papel es ayudarte a descubrirlas." }, { title: "Comunidad sobre Competencia", description: "Crecemos al apoyarnos mutuamente. Este es un espacio de apoyo, no de comparación." }, { title: "Integración, no Adición", description: "No se trata de añadir más a tu plato. Se trata de alinear lo que ya existe con tu verdadero ser." }, { title: "Autenticidad Valiente", description: "Te animamos a mostrarte como eres, con imperfecciones y todo. Ahí es donde reside el verdadero poder." }, { title: "La Acción Crea Claridad", description: "La introspección es valiosa, pero la transformación ocurre cuando das pequeños pasos consistentes." }, { title: "La Alegría no es Negociable", description: "Creemos que una vida plena debe incluir juego, placer y un profundo sentido de alegría." }] },
        forWhom: { title: "¿Es Esto Para Ti?", items: ["Sientes que estás en una encrucijada, personal o profesionalmente.", "Has alcanzado el éxito, pero se siente vacío.", "Te preguntas '¿qué sigue?' en este capítulo de tu vida.", "Anhelas un significado y una conexión más profundos.", "Estás lista para invertir en ti misma y en tu futuro."] },
        learn: { title: "Lo Que Aprenderás", items: ["A reconectar con tu intuición y sabiduría interior.", "A establecer límites que honren tu energía y tu tiempo.", "Prácticas de mindfulness y autocompasión.", "Herramientas para navegar el cambio y la incertidumbre con gracia.", "A definir tus valores personales y vivir en alineación con ellos.", "A construir una comunidad de apoyo de mujeres en un camino similar."] },
        mentor: {
            title: "¿Quién es Marta Velasco?",
            name: "Marta Velasco",
            description: "Mi misión es acompañar a mujeres profesionales como tú a dejar atrás el miedo, recuperar la confianza y dar pasos firmes hacia un camino profesional que realmente les llene y les permita desplegar todo su potencial.\n\nComo Coach de Transiciones Vitales con Propósito y Terapeuta Sistémica, sé que los cambios reales suceden cuando pasas a la acción, tomas decisiones claras y exploras posibilidades que antes no veías.\n\nAllí afuera hay mucho ruido: cursos grabados, promesas rápidas y teorías que no llegan a generar una transformación real.\n\nMi propósito es ayudarte a ganar claridad, integrando el cambio de forma ágil, sin terapias interminables ni procesos dolorosos, para que avances con confianza y propósito.\n\nEste es tu momento para conectar con lo que realmente quieres y construir una vida profesional más alineada contigo. ¡Te veo dentro!"
        },
        testimonials: {
            title: "Lo Que Dicen Nuestras Alumnas",
            items: [
                {
                    name: "Juliette",
                    role: "Una mamá Francesa que planifica su próxima etapa y se permite su sueño de escribir Teatro",
                    quote: "Este viaje con Marta me va a dejar una huella profunda. Me he liberado de mochilas que no me estaban permitiendo ser yo misma. He logrado ver mi fuerza, reconocerla y quererla. Me he dado cuenta de la necesidad tan grande de disfrutar que tenía y de poder hacer algo que me represente de verdad. Me he vuelto a ilusionar y voy a permitirme seguir soñando. Me veo con ganas, con vida y con un bonito futuro. Gracias Marta, ha sido un antes y un después."
                },
                {
                    name: "Silvia",
                    role: "Ingeniera en busca de su Identidad",
                    quote: "Gracias al Programa El Giro he podido tomar conciencia de mi problema y poner orden dentro de mi. Ahora me siento más dueña de mi misma, de quien soy y más libre para tomar mis decisiones. Increíble el trabajo con los muñecos, te impregnan una imagen muy potente de lo que te pasa y puedes acceder a ella cuando quieras, no había vivido esto en otras terapias o procesos de desarrollo personal. Es como una manera de auto terapia muy potente. Y qué decir de Marta, sus preguntas, su acompañamiento, sus lecturas y ejercicios, han sido como un acelerador en mi proceso."
                },
                {
                    name: "Elena",
                    role: "Ingeniera y Dra General de una compañía en Londres. Ha encontrado su propósito y una manera más plena de relacionarse con su trabajo",
                    quote: "Me embarqué en El Giro pensando que debía cambiar mi futuro profesional, y profundizando he descubierto algo sorprendente: el cambio que buscaba está en mi, mi manera de pensar y de gestionar mis emociones. Ahora me siento más potente y dueña de mi misma. Agradezco a Marta su agudeza y acompañamiento para haber tomado la mejor decisión. Y a la vida por sorprenderme. Muchas veces lo que necesitas no es un gran cambio, sino girar 1º. Vuelvo a mi vida con una nueva mirada."
                },
                {
                    name: "Ángela",
                    role: "Poeta Naturalista. Ha logrado superar su miedo a exponerse y lanzar su poemario",
                    quote: "Si nuestro camino se dibuja con pasos, el desarrollo personal nos colorea procesito a procesito. Con Marta y su programa, igual da caminar hasta aquí al lado que lejos. Marta acompaña con toda la pertinencia, respeto, sabiduría y amor, limpiando los pinceles y cambiando el agua, para que podamos tener claridad sobre cómo colorear nuestra vida, según lo que nos late dentro. Cada sesión es una etapa del viaje hacia una misma. Caminar con Marta es sencillamente redondo. He conseguido mirarme como I AM ANGELA y estoy feliz."
                }
            ]
        },
        cta: { title: "¿Lista para Empezar Tu Próximo Capítulo?", button: "Comienza Tu Viaje" },
        footer: { legalNotice: "Aviso Legal", salesPolicy: "Política de Venta y Devoluciones", copy: "© 2025 School of Midlife. Todos los derechos reservados." },
        legalNoticePage: {
            title: "Aviso Legal y Términos de Uso",
            back_button: "Volver al Inicio",
            content: [
                { text: "Se encuentra en un espacio 100 % seguro, por ello, dando cumplimiento con el deber de información recogido en artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y del Comercio Electrónico (LSSI, como referencia en el mercado digital), a continuación se hace constar:" },
                { heading: "1.1. Datos identificativos del responsable", list: ["Denominación social: School of Midlife LLC", "EIN: [EIN de la Empresa]", "Domicilio social: 1209 MOUNTAIN ROAD PL NE #4336, ALBUQUERQUE, NM, 87110, USA", "Nombre comercial: School of Midlife", "Email de contacto: [Email de Contacto]", "Actividad social: Venta de formación y mentoría."] },
                { heading: "1.2. Finalidad de la página web", text: "Los servicios prestados por el responsable de la página web son los siguientes:", list: ["Información sobre nuestros programas y formaciones.", "Venta de servicios de formación y mentoría.", "Gestionar la relación comercial con nuestros clientes y alumnos."] },
                { heading: "1.3. Usuarios", text: "El acceso y/o uso de este sitio web atribuye la condición de USUARIO, que acepta, desde dicho acceso y/o uso, los presentes términos de uso, no obstante, por el mero uso de la página web no significa el inicio de relación laboral/comercial alguna." },
                { heading: "1.4. Uso del sitio web y captura de información", text: "La página web (en adelante, LA WEB) proporciona el acceso a artículos, informaciones, servicios y datos (en adelante, 'los contenidos') propiedad de School of Midlife LLC. El USUARIO asume la responsabilidad del uso de la web. El USUARIO se compromete a hacer un uso adecuado de los contenidos que ofrece a través de su web y con carácter enunciativo pero no limitativo, a no emplearlos para:", list: ["(a) incurrir en actividades ilícitas, ilegales o contrarias a la buena fe y al orden público;", "(b) difundir contenidos o propaganda de carácter racista, xenófobo, pornográfico-ilegal, de apología del terrorismo o atentatorio contra los derechos humanos;", "(c) provocar daños en los sistemas físicos y lógicos de la web, de sus proveedores o de terceras personas, introducir o difundir en la red virus informáticos o cualesquiera otros sistemas físicos o lógicos que sean susceptibles de provocar los daños anteriormente mencionados;", "(d) intentar acceder y, en su caso, utilizar las cuentas de correo electrónico de otros usuarios y modificar o manipular sus mensajes."] },
                { text: "School of Midlife LLC se reserva el derecho de retirar todos aquellos comentarios y aportaciones que vulneren el respeto a la dignidad de la persona, que sean discriminatorios, xenófobos, racistas, pornográficos, que atentem contra la juventud o la infancia, el orden o la seguridad pública o que, a su juicio, no resultaran adecuados para su publicación. En cualquier caso, School of Midlife LLC no será responsable de las opiniones vertidas por los usuarios a través del blog u otras herramientas de participación que puedan crearse. School of Midlife LLC se reserva el derecho de modificar, en cualquier momento y sin necesidad de previo aviso, la presentación y configuración de la web como el presente aviso legal." },
                { heading: "2. Propiedad Intelectual e Industrial", text: "School of Midlife LLC por sí o como cesionario, es titular de todos los derechos de propiedad intelectual e industrial de su página web, así como de los elementos contenidos en la misma. Quedan expresamente prohibidas la reproducción, la distribución y la comunicación pública, incluida su modalidad de puesta a disposición, de la totalidad o parte de los contenidos de esta página web, con fines comerciales, en cualquier soporte y por cualquier medio técnico, sin la autorización de School of Midlife LLC. El USUARIO se compromete a respetar los derechos de Propiedad Intelectual e Industrial titularidad de School of Midlife LLC." },
                { heading: "3. Exclusión de Garantías y Responsabilidad", text: "School of Midlife LLC. no se hace responsable, en ningún caso, de los daños y perjuicios de cualquier naturaleza que pudieran ocasionar, a título enunciativo: por errores u omisiones en los contenidos, por falta de disponibilidad del sitio web, – el cual realizará paradas periódicas por mantenimientos técnicos – así como por la transmisión de virus o programas maliciosos o lesivos en los contenidos, a pesar de haber adoptado todas las medidas tecnológicas necesarias para evitarlo." },
                { heading: "4. Modificaciones", text: "School of Midlife LLC se reserva el derecho de efectuar sin previo aviso las modificaciones que considere oportunas en su web, pudiendo cambiar, suprimir o añadir tanto los contenidos y servicios que se presten a través de la misma como la forma en la que estos aparezcan presentados o localizados en su web." },
                { heading: "5. Política de Enlaces", text: "School of Midlife LLC no será responsable de los contenidos o servicios puestos a disposición del público en la página web o portal desde el cual se realice el hipervínculo, ni de las informaciones y manifestaciones incluidas en los mismos. El sitio web de School of Midlife LLC puede poner a disposición del usuario conexiones y enlaces a otros sitios web gestionados y controlados por terceros. Dichos enlaces tienen como exclusiva función, la de facilitar a los usuarios la búsqueda de información, contenidos y servicios en Internet, sin que en ningún caso pueda considerarse una sugerencia, recomendación o invitación para la visita de los mismos." },
                { heading: "6. Derecho de Exclusión", text: "School of Midlife LLC se reserva el derecho a denegar o retirar el acceso al portal y/o los servicios ofrecidos sin necesidad de preaviso, a instancia propia o de un tercero, a aquellos usuarios que incumplan las presentes Condiciones Generales de Uso." },
                { heading: "7. Generalidades", text: "School of Midlife LLC perseguirá el incumplimiento de las presentes condiciones así como cualquier utilización indebida de su web ejerciendo todas las acciones civiles y penales que le puedan corresponder en derecho." },
                { heading: "8. Modificación de las presentes condiciones y duración", text: "School of Midlife LLC podrá modificar en cualquier momento las condiciones aquí determinadas, siendo debidamente publicadas como aquí aparecen. La vigencia de las citadas condiciones irá en función de su exposición y estarán vigentes hasta que sean modificadas por otras debidamente publicadas." },
                { heading: "9. Reclamaciones y Dudas", text: "Para cualquier reclamación o duda, puede contactar a School of Midlife LLC a través del email [Email de Contacto]." },
                { heading: "10. Legislación Aplicable y Jurisdicción", text: "La relación entre School of Midlife LLC y el USUARIO se regirá por la normativa aplicable en el estado de Nuevo México, Estados Unidos. Cualquier controversia se someterá a los Juzgados y tribunales del estado de Nuevo México, salvo que la Ley aplicable disponga otra cosa." },
            ]
        },
        salesPolicyPage: {
            title: "Política de Venta y Devoluciones",
            back_button: "Volver al Inicio",
            content: [
                { text: "A continuación, se detallan las condiciones que rigen la adquisición y participación en los programas formativos ofrecidos por School of Midlife LLC (con domicilio en 1209 MOUNTAIN ROAD PL NE #4336, ALBUQUERQUE, NM, 87110, USA), así como las políticas de cancelación, devolución y desistimiento aplicables." },
                { heading: "Política de Ventas" },
                { heading: "1. Inscripción y Proceso de Compra", list: ["El usuario deberá formalizar su inscripción en el curso a través de la página web.", "La compra se ejecutará mediante el enlace de pago proporcionado.", "El usuario no estará formalmente inscrito hasta que haya completado tanto la inscripción como el pago del curso. Una vez realizado esto, su inscripción quedará confirmada."] },
                { heading: "2. Modalidades de Pago", text: "El pago puede realizarse de forma íntegra en el momento de la compra o fraccionada según el programa específico. El acceso al programa se obtendrá desde el primer pago, independientemente de la modalidad elegida. Los métodos de pago aceptados son:", list: ["Tarjeta bancaria", "Paypal", "Google Pay"] },
                { heading: "3. Plataformas de Contenido y Sesiones", list: ["Los programas formativos y el campus virtual se alojarán dentro de una plataforma designada (ej. Skool).", "Las sesiones online en vivo se realizarán a través de la plataforma Zoom."] },
                { heading: "Política de Devolución y Cancelación" },
                { heading: "1. Regla General", text: "No se permite la cancelación o devolución del programa una vez adquirido." },
                { heading: "2. Cancelación por el Alumno", text: "En caso de cancelación del curso por parte del alumno, no se reembolsará cantidad alguna, a menos que el alumno alegue una causa de fuerza mayor debidamente justificada." },
                { heading: "3. Compromiso de Pago Fraccionado", text: "Si el alumno ha optado por el pago fraccionado, estará obligado a pagar la totalidad de la matrícula en caso de cancelación fuera de plazo, baja o abandono, cualquiera que sea la causa, salvo un supuesto de fuerza mayor legalmente reconocido." },
                { heading: "Política de Sustitución", text: "Si la persona inscrita no puede participar en la formación: No se podrá sustituir por otra persona y no se ofrecerá otra fecha alternativa (si la hubiera)." },
                { heading: "Política de Desistimiento (Derecho Legal)" },
                { text: "En cumplimiento de la legislación aplicable para la Defensa de los Consumidores y Usuarios, School of Midlife LLC informa sobre el derecho de desistimiento:" },
                { heading: "1. Plazo para Ejercer el Desistimiento", text: "El alumno dispone de un plazo de 14 días naturales desde la fecha de formalización de la compra. El desistimiento puede ejercerse sin necesidad de justificación y sin penalización alguna, siempre y cuando no se haya accedido a los contenidos del curso." },
                { heading: "2. Excepciones al Derecho de Desistimiento", text: "El derecho de desistimiento no será aplicable una vez que el alumno haya accedido a los contenidos del curso o haya asistido a alguna de las sesiones en vivo. Esto se debe a que se trata de contenido digital suministrado de forma inmediata, cuya ejecución comienza con el consentimiento expreso del consumidor. Al acceder a los contenidos tras la compra, se entenderá que el alumno renuncia expresamente a su derecho de desistimiento." },
                { heading: "3. Solicitud de Desistimiento", text: "Si el alumno desea ejercer su derecho dentro del plazo legal y cumpliendo las condiciones, deberá enviar un correo electrónico a [Email de Contacto] con el asunto 'Desistimiento de matrícula'. El correo deberá incluir:", list: ["Nombre completo del alumno", "Email con el que se registró", "Nombre exacto del curso", "Fecha de compra"] },
                { heading: "4. Reembolso", text: "Una vez validada la solicitud, el reembolso se procesará en un plazo máximo de 14 días naturales. Se utilizará el mismo método de pago utilizado originalmente por el alumno." },
                { heading: "5. Pagos en Cuotas", text: "En caso de modalidad de pago fraccionado, el derecho de desistimiento aplica igualmente durante los primeros 14 días, si no se ha accedido al contenido. Si se procede a la cancelación, el reembolso abarcará la totalidad de las cuotas pagadas hasta ese momento." }
            ]
        }
    },
    en: {
        nav: { school: "The School", programs: "Programs", philosophy: "Philosophy", contact: "Contact" },
        hero: { subtitle: "A NEW PERSPECTIVE FOR THE SECOND HALF OF LIFE", title: "Rediscover Your Purpose.\nLive with Intention.", description: "School of Midlife is a transformative program designed for women who are ready to embrace their next chapter with clarity, confidence, and joy.", cta: "Learn More" },
        secondMountain: { title: "It's Time to Climb Your Second Mountain", p1: "The first half of life is often about building: career, family, identity. We climb the mountain society expects of us. But what happens when you reach a summit and find the view isn't what you expected?", p2: "The 'second mountain' is about finding a new purpose, one driven by inner values, connection, and contribution. It's not about achieving more, but living more meaningfully. We guide you on this new ascent." },
        about: { title: "What is the School of Midlife?", p1: "It's a space for introspection, learning, and community. We combine proven coaching methodologies, mindfulness practices, and neuroscience to help you navigate the unique challenges and opportunities of midlife.", p2: "This isn't about 'anti-aging' or chasing youth. It's about 'pro-aging'—embracing your wisdom, redefining success, and creating a life that is authentically yours." },
        beforeAfter: { title: "Your Transformation", before: { title: "Before", items: ["Feeling stuck, uncertain, or invisible.", "Overwhelmed by responsibilities, with no time for yourself.", "Questioning 'Is this all there is?'", "Lacking clarity on your next steps.", "Feeling disconnected from your true self."] }, after: { title: "After", items: ["Clarity on your purpose and what truly matters.", "Renewed energy and zest for life.", "Deep self-trust and confidence in your decisions.", "Meaningful connections with like-minded women.", "A practical roadmap for your next chapter."] } },
        programs: {
            title: "Our Programs",
            subtitle: "Choose the path that's right for you. Both programs offer a blend of group coaching, individual support, and practical tools.",
            giro: {
                duration: "3 MONTHS",
                title: "El Giro (The Turn)",
                subtitle: "A co-creation program for women who have decided to listen to themselves.",
                description: "For women who have decided to listen to themselves, make a turn, and pursue their dreams.",
                items: [
                    "Take control of your life and get off autopilot.",
                    "Learn to ground your dream in a tangible project with a practical, step-by-step method.",
                    "Shift your mindset, feel proud and passionate.",
                    "Discover the strength in your sensitivity to launch the dream that moves you.",
                    "Breathe the peace you long for and give meaning to your life.",
                    "Organize a concrete plan that allows you to take action and create the life you want to live."
                ],
                footer: "Begin your journey of rediscovery."
            },
            camino: {
                duration: "6 MONTHS",
                title: "El Camino (The Path)",
                subtitle: "A Deep Transformation",
                description: "A comprehensive 6-month mentorship for women ready to fully commit to designing and living their second-half masterpiece. Includes everything in El Giro, plus more.",
                items: ["Everything in El Giro, plus:", "Monthly one-on-one coaching sessions", "Personalized roadmap development", "Deep-dive workshops on specific topics", "Lifetime access to our community"],
                footer: "Walk the path to your most authentic life."
            }
        },
        philosophy: { title: "Our Guiding Principles", items: [{ title: "Wisdom Within", description: "We believe you already have the answers. Our role is to help you uncover them." }, { title: "Community over Competition", description: "We rise by lifting each other. This is a space of support, not comparison." }, { title: "Integration, Not Addition", description: "This isn't about adding more to your plate. It's about aligning what's already there with your true self." }, { title: "Courageous Authenticity", description: "We encourage you to show up as you are, imperfections and all. That's where true power lies." }, { title: "Action Creates Clarity", description: "Insight is valuable, but transformation happens when you take small, consistent steps." }, { title: "Joy is Non-Negotiable", description: "We believe a fulfilling life must include play, pleasure, and a deep sense of joy." }] },
        forWhom: { title: "Is This For You?", items: ["You feel like you're at a crossroads, personally or professionally.", "You've achieved success, but it feels hollow.", "You're asking 'what's next?' for this chapter of your life.", "You crave deeper meaning and connection.", "You're ready to invest in yourself and your future."] },
        learn: { title: "What You Will Learn", items: ["To reconnect with your intuition and inner wisdom.", "How to set boundaries that honor your energy and time.", "Mindfulness and self-compassion practices.", "Tools to navigate change and uncertainty with grace.", "How to define your personal values and live in alignment with them.", "To build a supportive community of women on a similar path."] },
        mentor: {
            title: "Who is Marta Velasco?",
            name: "Marta Velasco",
            description: "My mission is to accompany professional women like you to leave fear behind, regain confidence, and take firm steps towards a professional path that truly fulfills you and allows you to unfold your full potential.\n\nAs a Purposeful Life Transitions Coach and Systemic Therapist, I know that real changes happen when you take action, make clear decisions, and explore possibilities you didn't see before.\n\nThere is a lot of noise out there: recorded courses, quick promises, and theories that don't lead to real transformation.\n\nMy purpose is to help you gain clarity, integrating change in an agile way, without endless therapies or painful processes, so you can move forward with confidence and purpose.\n\nThis is your moment to connect with what you really want and build a professional life more aligned with yourself. See you inside!"
        },
        testimonials: {
            title: "What Our Alumnae Say",
            items: [
                {
                    name: "Juliette",
                    role: "A French mom planning her next stage and allowing herself to dream of writing Theater",
                    quote: "This journey with Marta will leave a deep mark on me. I have freed myself from burdens that were not allowing me to be myself. I have managed to see my strength, recognize it and love it. I have realized the great need to enjoy that I had and to be able to do something that truly represents me. I have become excited again and I will allow myself to keep dreaming. I see myself with desire, with life and with a beautiful future. Thank you Marta, it has been a before and after."
                },
                {
                    name: "Silvia",
                    role: "Engineer in search of her Identity",
                    quote: "Thanks to El Giro Program I have been able to become aware of my problem and put order within myself. Now I feel more in control of myself, of who I am and freer to make my decisions. The work with the dolls is incredible, they imprint a very powerful image of what is happening to you and you can access it whenever you want, I had not experienced this in other therapies or personal development processes. It is like a very powerful way of self-therapy. And what can I say about Marta, her questions, her accompaniment, her readings and exercises, have been like an accelerator in my process."
                },
                {
                    name: "Elena",
                    role: "Engineer and General Director of a company in London. She has found her purpose and a fuller way of relating to her work",
                    quote: "I embarked on El Giro thinking that I should change my professional future, and by delving deeper I discovered something surprising: the change I was looking for is in me, my way of thinking and managing my emotions. Now I feel more powerful and in control of myself. I thank Marta for her sharpness and accompaniment for having made the best decision. And to life for surprising me. Many times what you need is not a big change, but to turn 1º. I return to my life with a new look."
                },
                {
                    name: "Ángela",
                    role: "Naturalist Poet. She has managed to overcome her fear of exposing herself and launching her poetry collection",
                    quote: "If our path is drawn with steps, personal development colors us process by process. With Marta and her program, it doesn't matter whether you walk right here next door or far away. Marta accompanies with all the pertinence, respect, wisdom and love, cleaning the brushes and changing the water, so that we can have clarity on how to color our life, according to what beats inside us. Each session is a stage of the journey towards oneself. Walking with Marta is simply perfect. I have managed to look at myself as I AM ANGELA and I am happy."
                }
            ]
        },
        cta: { title: "Ready to Begin Your Next Chapter?", button: "Start Your Journey" },
        footer: { legalNotice: "Legal Notice", salesPolicy: "Sales & Returns Policy", copy: "© 2025 School of Midlife. All rights reserved." },
        legalNoticePage: {
            title: "Legal Notice and Terms of Use",
            back_button: "Back to Home",
            content: [
                { text: "You are in a 100% secure space. Therefore, in compliance with the duty of information set out in Article 10 of Law 34/2002, of July 11, on Information Society Services and Electronic Commerce (LSSI, as a reference in the digital market), the following is stated:" },
                { heading: "1.1. Identification of the responsible party", list: ["Company name: School of Midlife LLC", "EIN: [Company EIN]", "Registered office: 1209 MOUNTAIN ROAD PL NE #4336, ALBUQUERQUE, NM, 87110, USA", "Trade name: School of Midlife", "Contact email: [Contact Email]", "Social activity: Sale of training and mentoring."] },
                { heading: "1.2. Purpose of the website", text: "The services provided by the person in charge of the website are as follows:", list: ["Information about our programs and training.", "Sale of training and business mentoring services.", "Managing the commercial relationship with our clients and students."] },
                { heading: "1.3. Users", text: "Access and/or use of this website attributes the condition of USER, who accepts, from said access and/or use, these terms of use. However, the mere use of the website does not imply the beginning of any employment/commercial relationship." },
                { heading: "1.4. Use of the website and information capture", text: "The website (hereinafter, THE WEBSITE) provides access to articles, information, services, and data (hereinafter, 'the contents') owned by School of Midlife LLC. The USER assumes responsibility for the use of the website. The USER agrees to make appropriate use of the content offered through its website and, by way of example but not limitation, not to use them for:", list: ["(a) engaging in illicit, illegal or contrary to good faith and public order activities;", "(b) disseminating content or propaganda of a racist, xenophobic, pornographic-illegal nature, of apology for terrorism or detrimental to human rights;", "(c) causing damage to the physical and logical systems of the website, its suppliers or third parties, introducing or spreading computer viruses or any other physical or logical systems that are likely to cause the aforementioned damage;", "(d) attempting to access and, where appropriate, use the email accounts of other users and modify or manipulate their messages."] },
                { text: "School of Midlife LLC reserves the right to withdraw all comments and contributions that violate respect for the dignity of the person, that are discriminatory, xenophobic, racist, pornographic, that threaten youth or childhood, public order or safety, or that, in its opinion, are not suitable for publication. In any case, School of Midlife LLC will not be responsible for the opinions expressed by users through the blog or other participation tools that may be created. School of Midlife LLC reserves the right to modify, at any time and without prior notice, the presentation and configuration of the website as well as this legal notice." },
                { heading: "2. Intellectual and Industrial Property", text: "School of Midlife LLC, by itself or as an assignee, is the owner of all intellectual and industrial property rights of its website, as well as the elements contained therein. The reproduction, distribution, and public communication, including its method of making available, of all or part of the contents of this website, for commercial purposes, in any medium and by any technical means, without the authorization of School of Midlife LLC, are expressly prohibited. The USER agrees to respect the Intellectual and Industrial Property rights owned by School of Midlife LLC." },
                { heading: "3. Exclusion of Guarantees and Liability", text: "School of Midlife LLC is not responsible, in any case, for damages of any kind that may be caused, by way of example: by errors or omissions in the content, by lack of availability of the website - which will make periodic stops for technical maintenance - as well as by the transmission of viruses or malicious or harmful programs in the content, despite having adopted all the necessary technological measures to prevent it." },
                { heading: "4. Modifications", text: "School of Midlife LLC reserves the right to make the modifications it deems appropriate on its website without prior notice, being able to change, delete or add both the content and services provided through it and the way in which they are presented or located on its website." },
                { heading: "5. Link Policy", text: "School of Midlife LLC will not be responsible for the content or services made available to the public on the web page or portal from which the hyperlink is made, nor for the information and statements included therein. The School of Midlife LLC website may make available to the user connections and links to other websites managed and controlled by third parties. These links have the exclusive function of facilitating users' search for information, content and services on the Internet, without in any case being considered a suggestion, recommendation or invitation to visit them." },
                { heading: "6. Right of Exclusion", text: "School of Midlife LLC reserves the right to deny or withdraw access to the portal and/or the services offered without prior notice, at its own request or that of a third party, to those users who violate these General Conditions of Use." },
                { heading: "7. General", text: "School of Midlife LLC will pursue the breach of these conditions as well as any improper use of its website by exercising all civil and criminal actions that may correspond to it by law." },
                { heading: "8. Modification of these conditions and duration", text: "School of Midlife LLC may modify the conditions determined here at any time, being duly published as they appear here. The validity of the aforementioned conditions will depend on their exposure and will be in force until they are modified by others duly published." },
                { heading: "9. Claims and Doubts", text: "For any claim or doubt, you can contact School of Midlife LLC via the email [Contact Email]." },
                { heading: "10. Applicable Law and Jurisdiction", text: "The relationship between School of Midlife LLC and the USER will be governed by the applicable regulations in the state of New Mexico, United States. Any controversy will be submitted to the Courts and tribunals of the state of New Mexico, unless the applicable law provides otherwise." },
            ]
        },
        salesPolicyPage: {
            title: "Sales and Returns Policy",
            back_button: "Back to Home",
            content: [
                { text: "Below are the conditions governing the acquisition and participation in the training programs offered by School of Midlife LLC (with registered office at 1209 MOUNTAIN ROAD PL NE #4336, ALBUQUERQUE, NM, 87110, USA), as well as the applicable cancellation, return, and withdrawal policies." },
                { heading: "Sales Policy" },
                { heading: "1. Registration and Purchase Process", list: ["The user must formalize their registration for the course through the website.", "The purchase will be executed through the payment link provided.", "The user will not be formally registered until they have completed both the registration and the payment of the course. Once this is done, their registration will be confirmed."] },
                { heading: "2. Payment Methods", text: "Payment can be made in full at the time of purchase or in installments depending on the specific program. Access to the program will be granted from the first payment, regardless of the chosen modality. Accepted payment methods are:", list: ["Bank card", "Paypal", "Google Pay"] },
                { heading: "3. Content Platforms and Sessions", list: ["The training programs and the virtual campus will be hosted within a designated platform (e.g., Skool).", "Live online sessions will be held via the Zoom platform."] },
                { heading: "Return and Cancellation Policy" },
                { heading: "1. General Rule", text: "Cancellation or return of the program is not permitted once it has been purchased." },
                { heading: "2. Cancellation by the Student", text: "In case of cancellation of the course by the student, no amount will be refunded, unless the student alleges a duly justified cause of force majeure." },
                { heading: "3. Installment Payment Commitment", text: "If the student has opted for installment payment, they will be obliged to pay the full tuition fee in case of late cancellation, withdrawal, or abandonment, for whatever reason, except in a legally recognized case of force majeure." },
                { heading: "Substitution Policy", text: "If the registered person cannot participate in the training: They cannot be replaced by another person, and an alternative date will not be offered (if any)." },
                { heading: "Withdrawal Policy (Legal Right)" },
                { text: "In compliance with applicable consumer protection legislation, School of Midlife LLC informs about the right of withdrawal:" },
                { heading: "1. Period to Exercise Withdrawal", text: "The student has a period of 14 calendar days from the date of formalization of the purchase. The withdrawal can be exercised without justification and without penalty, as long as the course content has not been accessed." },
                { heading: "2. Exceptions to the Right of Withdrawal", text: "The right of withdrawal will not be applicable once the student has accessed the course content or attended any of the live sessions. This is because it is digital content supplied immediately, the execution of which begins with the express consent of the consumer. By accessing the content after purchase, it will be understood that the student expressly waives their right of withdrawal." },
                { heading: "3. Request for Withdrawal", text: "If the student wishes to exercise their right within the legal period and complying with the conditions, they must send an email to [Contact Email] with the subject 'Withdrawal of enrollment'. The email must include:", list: ["Full name of the student", "Email with which they registered", "Exact name of the course", "Date of purchase"] },
                { heading: "4. Refund", text: "Once the request has been validated, the refund will be processed within a maximum period of 14 calendar days. The same payment method originally used by the student will be used." },
                { heading: "5. Installment Payments", text: "In the case of installment payment, the right of withdrawal also applies during the first 14 days, if the content has not been accessed. If the cancellation proceeds, the refund will cover all installments paid up to that moment." }
            ]
        }
    }
};


// --- CONTEXT & PROVIDER ---
interface LanguageContextType {
    language: Language;
    setLanguage: Dispatch<SetStateAction<Language>>;
    content: Content;
    setView: Dispatch<SetStateAction<View>>;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [language, setLanguage] = useState<Language>('es');
    const [view, setView] = useState<View>('main');

    const content = useMemo(() => contentData[language], [language]);

    const value = {
        language,
        setLanguage,
        content,
        setView,
    };

    return (
        <LanguageContext.Provider value={value}>
            <div className="bg-cream font-sans text-base text-text-light antialiased">
                {view === 'main' && children}
                {view === 'legal' && <LegalNoticePage />}
                {view === 'sales' && <SalesPolicyPage />}
            </div>
        </LanguageContext.Provider>
    );
};

const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};

// --- HELPER COMPONENTS ---
const CheckIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
    </svg>
);

const Section: React.FC<{ id: string; className?: string; children: React.ReactNode }> = ({ id, className, children }) => (
    <section id={id} className={`w-full py-16 md:py-24 px-6 md:px-12 lg:px-24 ${className}`}>
        <div className="max-w-5xl mx-auto">
            {children}
        </div>
    </section>
);

// --- UI COMPONENTS ---

const LanguageSwitcher: React.FC = () => {
    const { language, setLanguage } = useLanguage();

    const toggleLanguage = () => {
        setLanguage(lang => lang === 'es' ? 'en' : 'es');
    };

    return (
        <button
            onClick={toggleLanguage}
            className="border border-gold-soft text-text-dark px-3 py-1 rounded-full text-sm font-sans hover:bg-gold-soft hover:text-cream transition-colors duration-300"
        >
            {language === 'es' ? 'EN' : 'ES'}
        </button>
    );
};

const Header: React.FC = () => {
    const { content } = useLanguage();
    return (
        <header className="fixed top-0 left-0 right-0 bg-cream/80 backdrop-blur-md z-50 shadow-sm">
            <nav className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center h-20">
                <a href="#hero" className="text-text-dark">
                    <Logo />
                </a>
                <div className="hidden md:flex items-center space-x-8 font-sans text-text-light">
                    <a href="#about" className="hover:text-gold-soft transition-colors">
                        {content.nav.school}
                    </a>
                    <a href="#programs" className="hover:text-gold-soft transition-colors">
                        {content.nav.programs}
                    </a>
                    <a href="#philosophy" className="hover:text-gold-soft transition-colors">
                        {content.nav.philosophy}
                    </a>
                </div>
                <div className="flex items-center space-x-4">
                    <a href="#cta" className="hidden sm:inline-block bg-gold-soft text-cream px-5 py-2 rounded-full text-sm font-sans hover:opacity-90 transition-opacity">
                        {content.nav.contact}
                    </a>
                    <LanguageSwitcher />
                </div>
            </nav>
        </header>
    );
};

const Hero: React.FC = () => {
    const { content } = useLanguage();
    return (
        <Section id="hero" className="min-h-screen flex items-center bg-cream pt-20">
            <div className="text-center w-full max-w-3xl mx-auto">
                <p className="font-sans text-gold-soft mb-4">{content.hero.subtitle}</p>
                <h1 className="font-serif text-4xl md:text-6xl text-text-dark font-semibold whitespace-pre-line leading-tight">
                    {content.hero.title}
                </h1>
                <p className="font-sans text-lg md:text-xl text-text-light mt-6 max-w-2xl mx-auto">
                    {content.hero.description}
                </p>
                <a href="#cta" className="mt-10 inline-block bg-gold-soft text-cream px-10 py-4 rounded-full font-sans hover:opacity-90 transition-opacity text-lg">
                    {content.hero.cta}
                </a>
            </div>
        </Section>
    );
};


const SecondMountain: React.FC = () => {
    const { content } = useLanguage();
    return (
        <Section id="second-mountain" className="bg-nude/30">
            <div className="text-center max-w-3xl mx-auto">
                <h2 className="font-serif text-3xl md:text-4xl text-text-dark">{content.secondMountain.title}</h2>
                <div className="mt-8 space-y-6 font-sans text-lg text-text-light text-left md:text-center">
                    <p>{content.secondMountain.p1}</p>
                    <p>{content.secondMountain.p2}</p>
                </div>
            </div>
        </Section>
    )
}

const AboutSchool: React.FC = () => {
    const { content } = useLanguage();
    return (
        <Section id="about" className="bg-cream">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="relative h-80 md:h-96 rounded-lg overflow-hidden">
                    <img src="https://picsum.photos/seed/midlife1/800/1000" alt="Woman contemplating" className="absolute inset-0 w-full h-full object-cover" />
                </div>
                <div className="max-w-xl">
                    <h2 className="font-serif text-3xl md:text-4xl text-text-dark">{content.about.title}</h2>
                    <div className="mt-6 space-y-4 font-sans text-lg text-text-light">
                        <p>{content.about.p1}</p>
                        <p>{content.about.p2}</p>
                    </div>
                </div>
            </div>
        </Section>
    )
}

const BeforeAfter: React.FC = () => {
    const { content } = useLanguage();
    return (
        <Section id="transformation" className="bg-nude/30">
            <h2 className="font-serif text-3xl md:text-4xl text-text-dark text-center">{content.beforeAfter.title}</h2>
            <div className="mt-12 grid md:grid-cols-2 gap-8 md:gap-16">
                <div className="bg-cream p-8 rounded-lg shadow-sm">
                    <h3 className="font-serif text-2xl text-text-dark">{content.beforeAfter.before.title}</h3>
                    <ul className="mt-6 space-y-4 font-sans text-text-light">
                        {content.beforeAfter.before.items.map((item, i) => (
                            <li key={i} className="flex items-start">
                                <span className="text-gold-soft mr-3 mt-1 flex-shrink-0">&ndash;</span>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="bg-cream p-8 rounded-lg shadow-sm border-2 border-gold-soft">
                    <h3 className="font-serif text-2xl text-gold-soft">{content.beforeAfter.after.title}</h3>
                    <ul className="mt-6 space-y-4 font-sans text-text-dark">
                        {content.beforeAfter.after.items.map((item, i) => (
                            <li key={i} className="flex items-start">
                                <CheckIcon className="w-5 h-5 text-gold-soft mr-3 mt-1 flex-shrink-0" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </Section>
    )
}

const Programs: React.FC = () => {
    const { content } = useLanguage();
    const { giro, camino } = content.programs;
    return (
        <Section id="programs" className="bg-cream">
            <div className="text-center">
                <h2 className="font-serif text-3xl md:text-4xl text-text-dark">{content.programs.title}</h2>
                <p className="font-sans text-lg text-text-light mt-4 max-w-2xl mx-auto">{content.programs.subtitle}</p>
            </div>
            <div className="mt-12 grid md:grid-cols-2 gap-8 items-stretch">
                {/* EL GIRO */}
                <div className="border border-sand rounded-lg p-8 flex flex-col">
                    <p className="font-sans text-sm text-gold-soft uppercase tracking-widest">{giro.duration}</p>
                    <h3 className="font-serif text-3xl text-text-dark mt-2">{giro.title}</h3>
                    <p className="font-serif text-xl text-text-light">{giro.subtitle}</p>
                    <p className="font-sans text-text-light mt-6">{giro.description}</p>
                    <ul className="mt-6 space-y-3 font-sans text-text-light">
                        {giro.items.map((item, i) => (
                            <li key={i} className="flex items-start">
                                <CheckIcon className="w-5 h-5 text-gold-soft mr-3 mt-1 flex-shrink-0" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                    <p className="mt-auto pt-6 font-serif text-lg text-text-dark text-center italic">{giro.footer}</p>
                </div>

                {/* EL CAMINO */}
                <div className="border-2 border-gold-soft rounded-lg p-8 flex flex-col bg-nude/20">
                    <p className="font-sans text-sm text-gold-soft uppercase tracking-widest">{camino.duration}</p>
                    <h3 className="font-serif text-3xl text-text-dark mt-2">{camino.title}</h3>
                    <p className="font-serif text-xl text-text-light">{camino.subtitle}</p>
                    <p className="font-sans text-text-light mt-6">{camino.description}</p>
                    <ul className="mt-6 space-y-3 font-sans text-text-light">
                        {camino.items.map((item, i) => (
                            <li key={i} className="flex items-start">
                                <CheckIcon className="w-5 h-5 text-gold-soft mr-3 mt-1 flex-shrink-0" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                    <p className="mt-auto pt-6 font-serif text-lg text-text-dark text-center italic">{camino.footer}</p>
                </div>
            </div>
        </Section>
    );
};

const Philosophy: React.FC = () => {
    const { content } = useLanguage();
    return (
        <Section id="philosophy" className="bg-nude/30">
            <div className="text-center">
                <h2 className="font-serif text-3xl md:text-4xl text-text-dark">{content.philosophy.title}</h2>
            </div>
            <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {content.philosophy.items.map((item, i) => (
                    <div key={i} className="border-l-2 border-gold-soft pl-6">
                        <h3 className="font-serif text-xl text-text-dark">{item.title}</h3>
                        <p className="font-sans text-text-light mt-2">{item.description}</p>
                    </div>
                ))}
            </div>
        </Section>
    );
};

const ForWhom: React.FC = () => {
    const { content } = useLanguage();
    return (
        <Section id="for-whom" className="bg-cream">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="order-2 md:order-1">
                    <h2 className="font-serif text-3xl md:text-4xl text-text-dark">{content.forWhom.title}</h2>
                    <ul className="mt-8 space-y-4 font-sans text-lg text-text-light">
                        {content.forWhom.items.map((item, i) => (
                            <li key={i} className="flex">
                                <CheckIcon className="w-6 h-6 text-gold-soft mr-4 mt-1 flex-shrink-0" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="order-1 md:order-2 relative h-80 md:h-96 rounded-lg overflow-hidden">
                    <img src="https://picsum.photos/seed/midlife2/800/1000" alt="Mature woman smiling" className="absolute inset-0 w-full h-full object-cover" />
                </div>
            </div>
        </Section>
    )
}

const Learn: React.FC = () => {
    const { content } = useLanguage();
    return (
        <Section id="learn" className="bg-nude/30">
            <div className="max-w-3xl mx-auto">
                <h2 className="font-serif text-3xl md:text-4xl text-text-dark text-center">{content.learn.title}</h2>
                <div className="mt-12 grid sm:grid-cols-2 gap-x-8 gap-y-6">
                    {content.learn.items.map((item, i) => (
                        <div key={i} className="flex items-start font-sans text-text-light text-lg">
                            <span className="text-gold-soft text-2xl mr-3 mt-[-2px]">*</span>
                            <span>{item}</span>
                        </div>
                    ))}
                </div>
            </div>
        </Section>
    )
}

const Mentor: React.FC = () => {
    const { content } = useLanguage();
    return (
        <Section id="mentor" className="bg-cream">
            <div className="text-center max-w-3xl mx-auto">
                <h2 className="font-serif text-3xl md:text-4xl text-text-dark">{content.mentor.title}</h2>
                <div className="mt-10">
                    <div
                        className="w-64 h-80 rounded-2xl mx-auto border-4 border-nude overflow-hidden"
                    >
                        <img src="/marta.jpg" alt={content.mentor.name} className="w-full h-full object-contain object-center" />
                    </div>
                    <h3 className="font-serif text-2xl text-text-dark mt-6">{content.mentor.name}</h3>
                    <div className="font-sans text-lg text-text-light mt-4 text-left whitespace-pre-line space-y-4" dangerouslySetInnerHTML={{ __html: content.mentor.description.replace(/\n/g, '<br />') }} />
                </div>
            </div>
        </Section>
    );
};

const Testimonials: React.FC = () => {
    const { content } = useLanguage();
    return (
        <Section id="testimonials" className="bg-nude/30">
            <div className="max-w-6xl mx-auto">
                <h2 className="font-serif text-3xl md:text-4xl text-text-dark text-center">{content.testimonials.title}</h2>
                <div className="mt-12 grid md:grid-cols-2 gap-8">
                    {content.testimonials.items.map((testimonial, i) => (
                        <div key={i} className="bg-cream p-8 rounded-lg shadow-sm">
                            <div className="mb-4">
                                <h3 className="font-serif text-2xl text-text-dark">{testimonial.name}</h3>
                                <p className="font-sans text-sm text-gold-soft mt-1">{testimonial.role}</p>
                            </div>
                            <p className="font-sans text-text-light italic leading-relaxed">"{testimonial.quote}"</p>
                        </div>
                    ))}
                </div>
            </div>
        </Section>
    );
};


const CTA: React.FC = () => {
    const { content } = useLanguage();
    return (
        <Section id="cta" className="bg-gold-soft/90">
            <div className="text-center text-cream">
                <h2 className="font-serif text-3xl md:text-5xl font-semibold">{content.cta.title}</h2>
                <a
                    href="https://wa.me/34687700913"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-8 inline-block bg-cream text-gold-soft px-10 py-4 rounded-full font-sans hover:opacity-90 transition-opacity text-lg font-bold">
                    {content.cta.button}
                </a>
            </div>
        </Section>
    );
};

const Footer: React.FC = () => {
    const { content, setView } = useLanguage();
    return (
        <footer className="bg-nude/30 py-8 px-6 md:px-12">
            <div className="max-w-7xl mx-auto text-center font-sans text-text-light">
                <div className="flex justify-center space-x-6 mb-4">
                    <button onClick={() => setView('legal')} className="hover:text-gold-soft transition-colors">{content.footer.legalNotice}</button>
                    <button onClick={() => setView('sales')} className="hover:text-gold-soft transition-colors">{content.footer.salesPolicy}</button>
                </div>
                <p>{content.footer.copy}</p>
            </div>
        </footer>
    );
};

// --- LEGAL PAGES ---
const LegalPageLayout: React.FC<{ pageContent: LegalPageContent }> = ({ pageContent }) => {
    const { setView } = useLanguage();
    return (
        <div className="min-h-screen bg-cream py-24 px-6 md:px-12">
            <div className="max-w-4xl mx-auto">
                <h1 className="font-serif text-4xl md:text-5xl text-text-dark text-center mb-12">{pageContent.title}</h1>
                <div className="space-y-8 font-sans text-text-light leading-relaxed">
                    {pageContent.content.map((section, index) => (
                        <div key={index}>
                            {section.heading && <h2 className="font-bold text-text-dark text-xl mb-3 mt-4">{section.heading}</h2>}
                            {section.text && <p className="whitespace-pre-wrap">{section.text}</p>}
                            {section.list && (
                                <ul className="list-disc list-inside mt-2 space-y-1">
                                    {section.list.map((item, i) => <li key={i}>{item}</li>)}
                                </ul>
                            )}
                        </div>
                    ))}
                </div>
                <div className="text-center mt-16">
                    <button
                        onClick={() => setView('main')}
                        className="bg-gold-soft text-cream px-8 py-3 rounded-full font-sans hover:opacity-90 transition-opacity"
                    >
                        {pageContent.back_button}
                    </button>
                </div>
            </div>
        </div>
    );
};

const LegalNoticePage: React.FC = () => {
    const { content } = useLanguage();
    return <LegalPageLayout pageContent={content.legalNoticePage} />;
};

const SalesPolicyPage: React.FC = () => {
    const { content } = useLanguage();
    return <LegalPageLayout pageContent={content.salesPolicyPage} />;
};


// --- MAIN APP ---
export default function App() {
    return (
        <LanguageProvider>
            <Header />
            <main>
                <Hero />
                <SecondMountain />
                <AboutSchool />
                <BeforeAfter />
                <Programs />
                <Philosophy />
                <ForWhom />
                <Learn />
                <Mentor />
                <Testimonials />
                <CTA />
            </main>
            <Footer />
        </LanguageProvider>
    );
}
