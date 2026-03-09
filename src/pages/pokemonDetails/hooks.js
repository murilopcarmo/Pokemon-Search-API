export const formatName = (name) => {
    if (!name) return "";
    return name.replace(/_/g, " ") // Substitui todos os underscores por espaço
       .replace(/-/g, " ") // Substitui todos os hífens por espaço
       .replace(/\b\w/g, (char) => char.toUpperCase()); // Primeira letra de cada palavra em maiúscula
};