<script>
    export let nicknames = ['Alex_', 'Astral', 'Almandin', 'Evix', 'Gravis_', 'Leirn', 'Nu1t', 'Numb3rs', 'Oiy', 'Opruualla','raltheo', 'Sgnihtnem', 'ThePhilosopher', 'Unactive','zSarix']
    export let color = 'text-gray-900', animation = 'animate-bounce', duration = 2000

    let users = ''
    let counter = 0
    
    function change() {
        users = nicknames[counter]
        counter++

        if(counter >= nicknames.length) { counter = 0; }
    }

    setInterval(change, duration);
</script>

<p class="font-semibold {color} {animation}  transition ease-in-out">{users}</p>