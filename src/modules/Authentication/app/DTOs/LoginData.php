<?php

namespace Modules\Authentication\DTOs;

use Spatie\LaravelData\Data;
use Spatie\LaravelData\Attributes\Validation\Required;
use Spatie\LaravelData\Attributes\Validation\Regex;
use Spatie\LaravelData\Attributes\Validation\StringType;
use Spatie\LaravelData\Attributes\Validation\BooleanType;

class LoginData extends Data
{
    public function __construct(
        #[Required, StringType, Regex('/^\S+$/')]
        public string $identifier,

        #[Required, StringType]
        public string $password,

        #[Required, BooleanType]
        public bool $remember
    ) {}
}
