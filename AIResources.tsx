import React, { useState } from 'react';
import { useLanguage } from './App';

// Define the Resource type
type ResourceType = 'url' | 'text';

interface Resource {
    id: string;
    title: string;
    type: ResourceType;
    url?: string;
    content?: string;
}

// Initial data - Add your pages here
const initialResources: Resource[] = [
    {
        id: 'git-basics',
        title: 'Guía Git & GitHub',
        type: 'url',
        url: '/ai-library/git-basics.html' // Points to public/ai-library/git-basics.html
    },
    {
        id: 'example-external',
        title: 'Ejemplo Wikipedia (Externo)',
        type: 'url',
        url: 'https://es.wikipedia.org/wiki/Inteligencia_artificial'
    }
];

const AIResourcesPage: React.FC = () => {
    const { setView } = useLanguage();
    const [activeResourceId, setActiveResourceId] = useState<string>(initialResources[0].id);

    const activeResource = initialResources.find(r => r.id === activeResourceId) || initialResources[0];

    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-cream text-text-dark font-sans">
            {/* Sidebar */}
            <aside className="w-full md:w-64 bg-nude/20 border-r border-gold-soft/20 flex-shrink-0">
                <div className="p-6 border-b border-gold-soft/20">
                    <h1 className="font-serif text-2xl text-text-dark">Recursos IA</h1>
                    <button
                        onClick={() => setView('main')}
                        className="mt-4 text-sm text-gold-soft hover:text-text-dark transition-colors flex items-center gap-2"
                    >
                        ← Volver al Inicio
                    </button>
                </div>

                <nav className="p-4 overflow-y-auto h-[calc(100vh-150px)]">
                    <ul className="space-y-2">
                        {initialResources.map(resource => (
                            <li key={resource.id}>
                                <button
                                    onClick={() => setActiveResourceId(resource.id)}
                                    className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${activeResourceId === resource.id
                                        ? 'bg-gold-soft text-cream shadow-sm'
                                        : 'hover:bg-white/50 text-text-light hover:text-text-dark'
                                        }`}
                                >
                                    {resource.title}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 h-screen overflow-hidden flex flex-col">
                <header className="bg-white/50 backdrop-blur-sm border-b border-gold-soft/10 px-8 py-4 flex justify-between items-center">
                    <h2 className="font-serif text-xl text-text-dark">{activeResource.title}</h2>
                    <span className="text-xs uppercase tracking-wider text-gold-soft font-semibold px-3 py-1 bg-gold-soft/10 rounded-full">
                        {activeResource.type === 'url' ? 'Página Externa' : 'Nota Local'}
                    </span>
                </header>

                <div className="flex-1 overflow-y-auto bg-white/30 relative">
                    {activeResource.type === 'url' && activeResource.url ? (
                        <iframe
                            src={activeResource.url}
                            className="w-full h-full border-none"
                            title={activeResource.title}
                            allowFullScreen
                        />
                    ) : (
                        <div className="max-w-4xl mx-auto p-8 md:p-12 prose prose-stone prose-headings:font-serif prose-a:text-gold-soft hover:prose-a:text-text-dark">
                            <div dangerouslySetInnerHTML={{ __html: activeResource.content || '' }} />
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default AIResourcesPage;
