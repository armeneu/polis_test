<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>{{ config('app.name', 'Simple Blog') }}</title>

    @php
        $manifestPath = public_path('build/.vite/manifest.json');
        $manifest = file_exists($manifestPath) ? json_decode(file_get_contents($manifestPath), true) : null;
    @endphp

    @if($manifest && isset($manifest['js/app.tsx']))
        <!-- Built CSS & JS from Vite manifest -->
        @if(isset($manifest['js/app.tsx']['css']))
            @foreach($manifest['js/app.tsx']['css'] as $cssFile)
                <link rel="stylesheet" href="{{ asset('build/' . $cssFile) }}?v={{ time() }}">
            @endforeach
        @endif

        @if(isset($manifest['js/app.tsx']['file']))
            <script type="module" src="{{ asset('build/' . $manifest['js/app.tsx']['file']) }}?v={{ time() }}"></script>
        @endif
    @else
        <!-- Fallback for development -->
        <script type="module" src="http://localhost:5173/@vite/client"></script>
        <script type="module" src="http://localhost:5173/resources/js/app.tsx"></script>
    @endif
</head>
<body>
    <div id="root"></div>
</body>
</html>