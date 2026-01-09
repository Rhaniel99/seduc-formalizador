<?php

namespace Modules\Demand\Enums;

enum DemandStatus: int
{
    case TO_START = 1;
    case IN_PROGRESS = 2;
    case COMPLETED = 3;
    case ARCHIVED = 4;
    case SENT_TO_SIGED = 5;
}
