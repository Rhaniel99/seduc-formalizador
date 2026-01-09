<?php

namespace App\Enums;

enum UserProfile: int
{
    case DEV = 0;
    case GESTOR_DE_CONTAS = 1;
    case REQUISITANTE = 2;
    case DETIN = 3;
}
