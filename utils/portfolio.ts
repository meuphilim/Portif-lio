export function getLanguageEmoji(language: string | null): string {
  const emojis: Record<string, string> = {
    JavaScript: "🟨",
    TypeScript: "🔷",
    Python: "🐍",
    Java: "☕",
    "C++": "⚡",
    C: "🔧",
    "C#": "💜",
    PHP: "🐘",
    Ruby: "💎",
    Go: "🐹",
    Rust: "🦀",
    Swift: "🍎",
    Kotlin: "🎯",
    Dart: "🎯",
    HTML: "🌐",
    CSS: "🎨",
    Shell: "🐚",
    Vue: "💚",
    React: "⚛️",
    Angular: "🅰️",
  }
  return emojis[language || ""] || "📄"
}

export function getLanguageColors(): Record<string, string> {
  return {
    TypeScript: "3178C6",
    JavaScript: "F7DF1E",
    Python: "3776AB",
    Java: "ED8B00",
    "C++": "00599C",
    C: "A8B9CC",
    "C#": "239120",
    PHP: "777BB4",
    Ruby: "CC342D",
    Go: "00ADD8",
    Rust: "000000",
    Swift: "FA7343",
    Kotlin: "0095D5",
    Dart: "0175C2",
    HTML: "E34F26",
    CSS: "1572B6",
    Shell: "89E051",
    Vue: "4FC08D",
    React: "61DAFB",
    Angular: "DD0031",
    Outros: "6C757D",
  }
}

export function getLanguageLogos(): Record<string, string> {
  return {
    TypeScript: "typescript",
    JavaScript: "javascript",
    Python: "python",
    Java: "java",
    "C++": "cplusplus",
    C: "c",
    "C#": "csharp",
    PHP: "php",
    Ruby: "ruby",
    Go: "go",
    Rust: "rust",
    Swift: "swift",
    Kotlin: "kotlin",
    Dart: "dart",
    HTML: "html5",
    CSS: "css3",
    Shell: "gnubash",
    Vue: "vuedotjs",
    React: "react",
    Angular: "angular",
  }
}
