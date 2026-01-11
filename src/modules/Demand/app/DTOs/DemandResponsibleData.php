<?php

namespace Modules\Demand\DTOs;

use Spatie\LaravelData\Data;

class DemandResponsibleData extends Data
{
    public function __construct(
        public string $name,
        public string $registrationNumber,
    ) {}
}
