$files = Get-ChildItem -Path "c:\Users\Aman Sharma\Desktop\porfolio\src\components" -Filter *.tsx -Recurse

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    
    # Text colors
    $content = $content -replace 'text-neon-blue', 'text-white'
    $content = $content -replace 'text-neon-purple', 'text-zinc-400'
    
    # Backgrounds
    $content = $content -replace 'bg-neon-blue/10', 'bg-white/5'
    $content = $content -replace 'bg-neon-purple/10', 'bg-white/5'
    $content = $content -replace 'bg-neon-blue/20', 'bg-white/10'
    $content = $content -replace 'bg-neon-purple/20', 'bg-white/10'
    $content = $content -replace 'bg-neon-blue', 'bg-white'
    $content = $content -replace 'bg-neon-purple', 'bg-zinc-400'
    
    # Borders and Rings
    $content = $content -replace 'border-neon-blue/30', 'border-white/10'
    $content = $content -replace 'border-neon-purple/30', 'border-white/10'
    $content = $content -replace 'border-neon-blue/50', 'border-white/20'
    $content = $content -replace 'border-neon-purple/50', 'border-white/20'
    $content = $content -replace 'border-neon-blue', 'border-white/20'
    $content = $content -replace 'border-neon-purple', 'border-white/20'
    $content = $content -replace 'ring-neon-blue/30', 'ring-white/10'
    $content = $content -replace 'ring-neon-purple/30', 'ring-white/10'
    
    # Gradients
    $content = $content -replace 'from-neon-blue', 'from-white'
    $content = $content -replace 'to-neon-purple', 'to-zinc-500'
    $content = $content -replace 'from-neon-purple', 'from-zinc-500'
    $content = $content -replace 'to-neon-blue', 'to-white'
    $content = $content -replace 'via-neon-blue', 'via-zinc-400'
    
    # Glows and specific classes
    $content = $content -replace 'neon-glow-blue', 'neon-glow-primary'
    $content = $content -replace 'shadow-\[0_0_15px_rgba\(0,229,255,0\.\d+\)\]', 'shadow-none'
    $content = $content -replace 'shadow-\[0_0_15px_rgba\(139,92,246,0\.\d+\)\]', 'shadow-none'

    Set-Content -Path $file.FullName -Value $content -NoNewline
}

Write-Host "Replaced all neon classes successfully!"
