rm -rf node_modules pnpm-lock.yaml .turbo

safe_remove() {
    [ -d "$1" ] && rm -rf "$1"
}

dirs_to_remove=(
    "node_modules"
    "dist"
    ".nuxt"
    ".vitepress/cache"
    ".vitepress/dist"
    ".output"
    ".turbo"
)

for base in packages apps; do
    for d in "$base"/*; do
        echo "Cleaning $d"
        for dir in "${dirs_to_remove[@]}"; do
            safe_remove "$d/$dir"
        done
    done
done
