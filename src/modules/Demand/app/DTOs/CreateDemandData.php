<?php

namespace Modules\Demand\Data;

use Modules\Demand\DTOs\DemandResponsibleData;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Attributes\Validation\Rule;
use Spatie\LaravelData\Attributes\Validation\ArrayType;
use Spatie\LaravelData\Attributes\Validation\Nullable;

class CreateDemandData extends Data
{
    public function __construct(
        #[Nullable]
        #[Rule('string')]
        public ?string $title,

        #[Nullable]
        #[Rule('string')]
        public ?string $description,

        #[Nullable]
        #[Rule('string')]
        public ?string $type,

        #[Nullable]
        #[Rule('string')]
        public ?string $nature,

        #[Nullable]
        #[Rule('string')]
        public ?string $technicalArea,

        #[Nullable]
        #[Rule('string')]
        public ?string $urgency,

        #[Nullable]
        #[Rule('string')]
        public ?string $requestingArea,

        #[ArrayType(DemandResponsibleData::class)]
        public array $responsibles = [],

        #[Rule('integer')]
        public int $current_step = 1,
    ) {}

    public static function rules(): array
    {
        return [
            'title' => ['nullable', 'string', 'min:3', 'required_if:current_step,1,2,3,4'],
            'requestingArea' => ['nullable', 'string', 'required_if:current_step,1,2,3,4'],
            'responsibles' => ['nullable', 'array', 'min:1', 'required_if:current_step,1,2,3,4'],

            'type' => ['nullable', 'string', 'required_if:current_step,2,3,4'],
            'nature' => ['nullable', 'string', 'required_if:current_step,2,3,4'],
            'technicalArea' => ['nullable', 'string', 'required_if:current_step,2,3,4'],
            'urgency' => ['nullable', 'string', 'required_if:current_step,2,3,4'],

            'description' => ['nullable', 'string', 'min:50', 'required_if:current_step,3,4'],
        ];
    }
}
