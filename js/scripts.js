$(function() {
    const $revealElements = $('[data-reveal]');
    const prefersReducedMotion = window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
        $revealElements.addClass('is-visible');
    } else {
        $('body').addClass('has-motion');
        $revealElements.each(function(index) {
            const element = this;
            window.setTimeout(function() {
                $(element).addClass('is-visible');
            }, 90 * index);
        });
    }

    const $projectModal = $('#proyectoModal');
    if (!$projectModal.length) {
        return;
    }

    $projectModal
        .on('show.bs.modal', function(event) {
            const trigger = event.relatedTarget ||
                (event.originalEvent && event.originalEvent.relatedTarget);
            if (!trigger) {
                return;
            }

            const $trigger = $(trigger);
            const technologies = String($trigger.data('tecnologias') || '')
                .split(',')
                .map(function(technology) {
                    return technology.trim();
                })
                .filter(Boolean);
            const features = $trigger.data('caracteristicas') || [];
            const githubUrl = $trigger.data('github') || '';

            $('#proyectoModalLabel').text($trigger.data('titulo') || 'Detalles del proyecto');
            $('#modalDescripcion').text($trigger.data('descripcion') || '');
            $('#modalGithubLink')
                .attr('href', githubUrl || '#')
                .toggle(Boolean(githubUrl));

            const $featuresTitle = $('#modalCaracteristicasTitulo');
            const $featureList = $('#modalCaracteristicas').empty();
            $featuresTitle.toggle(features.length > 0);

            $.each(features, function(index, feature) {
                const $item = $('<li>');
                $('<strong>').text(feature.titulo).appendTo($item);
                $('<span>').text(feature.detalle).appendTo($item);
                $item.appendTo($featureList);
            });

            const $technologyTitle = $('#modalTecnologiasTitulo');
            const $technologyContainer = $('#modalTecnologias').empty();
            $technologyTitle.toggle(technologies.length > 0);

            $.each(technologies, function(index, technology) {
                $('<span>')
                    .addClass('badge bg-light text-dark border px-3 py-2')
                    .text(technology)
                    .appendTo($technologyContainer);
            });
        })
        .on('shown.bs.modal', function() {
            const $content = $(this).find('.modal-content');
            $content.removeClass('modal-pop-in');
            window.setTimeout(function() {
                $content.addClass('modal-pop-in');
            }, 10);
        })
        .on('hidden.bs.modal', function() {
            $(this).find('.modal-content').removeClass('modal-pop-in');
        });
});