export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "strollerina",
  description: "Hasonlíts össze babakocsikat, autós ülésket könnyedén",
  navItems: [
    // {
    //   label: "Home",
    //   href: "/",
    // },
    {
      label: "strollers",
      href: "/strollers",
    },
    {
      label: "carseats",
      href: "/carseats",
    },
    {
      label: "blog",
      href: "/blog",
    }, {
      label: "manuals",
      href: "/manuals",
    },
    {
      label: "about",
      href: "/about",
    },
  ],
  navMenuItems: [
    {
      label: "strollers",
      href: "/strollers",
    },
    {
      label: "carseats",
      href: "/carseats",
    },
    {
      label: "blog",
      href: "/blog",
    }, {
      label: "manuals",
      href: "/manuals",
    },
    {
      label: "about",
      href: "/about",
    },
  ],
  links: {
    github: "https://github.com/nextui-org/nextui",
    twitter: "https://twitter.com/getnextui",
    docs: "https://nextui.org",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://www.buymeacoffee.com/lombocska",
  },
  stroller_tags: [
    {section:"bumper",name: "detachable-bumper-bar", label: "main-card.chip.detachable-bumper-bar", tooltip: "main-card.tooltip.detachable-bumper-bar"},
    {section:"bumper",name: "bumper-bar-not-included", label: "main-card.chip.bumper-bar-not-included", tooltip: "main-card.tooltip.bumper-bar-not-included"},
    {section:"bumper",name: "no-bumper-bar", label: "main-card.chip.no-bumper-bar", tooltip: "main-card.tooltip.no-bumper-bar"},
    {section:"bumper",name: "pivotal-bumper-bar", label: "main-card.chip.pivotal-bumper-bar", tooltip: "main-card.tooltip.pivotal-bumper-bar"},
    {section: "dimension",name: "lightweight", label: "main-card.chip.lightweight", tooltip: "main-card.tooltip.lightweight"},
    {section: "dimension",name: "cabinApproved", label: "main-card.chip.cabinApproved", tooltip: "main-card.tooltip.cabinApproved"},
    {section: "dimension",name: "compact", label: "main-card.chip.compact", tooltip: "main-card.tooltip.compact"},
    {section: "system" ,name: "3in1", label: "main-card.chip.3in1", tooltip: "main-card.tooltip.3in1"},
    {section: "system" ,name: "2in1", label: "main-card.chip.2in1", tooltip: "main-card.tooltip.2in1"},
    {section: "system" ,name: "travel-system", label: "main-card.chip.travel-system", tooltip: "main-card.tooltip.travel-system"},
    {section: "system" ,name: "only-one-car-seat", label: "main-card.chip.only-one-car-seat", tooltip: "main-card.tooltip.only-one-car-seat"},
    {section: "harness", name: "3point-harness", label: "main-card.chip.3point-harness", tooltip: "main-card.tooltip.3point-harness"},
    {section: "harness", name: "5point-harness", label: "main-card.chip.5point-harness", tooltip: "main-card.tooltip.5point-harness"},
    {section: "harness", name: "one-pull-harness", label: "main-card.chip.one-pull-harness", tooltip: "main-card.tooltip.one-pull-harness"},
    {section: "harness", name: "magnetic-harness", label: "main-card.chip.magnetic-harness", tooltip: "main-card.tooltip.magnetic-harness"},
    {section: "harness", name: "happy-belt", label: "main-card.chip.happy-belt", tooltip: "main-card.tooltip.happy-belt"},
    {section: "seat", name: "recliningSeat", label: "main-card.chip.recliningSeat", tooltip: "main-card.tooltip.recliningSeat"},
    {section: "seat", name: "reversibleSeat", label: "main-card.chip.reversibleSeat", tooltip: "main-card.tooltip.reversibleSeat"},
    {section: "seat", name: "suitableForTallKids", label: "main-card.chip.suitableForTallKids", tooltip: "main-card.tooltip.suitableForTallKids"},
    {section: "seat", name: "suitableForChubbyKids", label: "main-card.chip.suitableForChubbyKids", tooltip: "main-card.tooltip.suitableForChubbyKids"},
    {section: "seat", name: "breathable-mesh", label: "main-card.chip.breathable-mesh", tooltip: "main-card.tooltip.breathable-mesh"},
    {section: "seat", name: "machine-wash-cold-cycle", label: "main-card.chip.machine-wash-cold-cycle", tooltip: "main-card.tooltip.machine-wash-cold-cycle"},
    {section: "seat", name: "only-handwash", label: "main-card.chip.only-handwash", tooltip: "main-card.tooltip.only-handwash"},
    {section: "seat", name: "straight-sit-up", label: "main-card.chip.straight-sit-up", tooltip: "main-card.tooltip.straight-sit-up"},
    {section: "seat", name: "extendable-seat", label: "main-card.chip.extendable-seat", tooltip: "main-card.tooltip.extendable-seat"},
    {section: "seat", name: "height-adjustable-seat", label: "main-card.chip.height-adjustable-seat", tooltip: "main-card.tooltip.height-adjustable-seat"},
    {section: "other-features", name: "electric", label: "main-card.chip.electric", tooltip: "main-card.tooltip.electric"},
    {section: "other-features", name: "carbon", label: "main-card.chip.carbon", tooltip: "main-card.tooltip.carbon"},
    {section: "other-features", name: "triplet", label: "main-card.chip.triplet", tooltip: "main-card.tooltip.triplet"},
    {section: "other-features", name: "double", label: "main-card.chip.double", tooltip: "main-card.tooltip.double"},
    {section: "other-features", name: "jogging", label: "main-card.chip.jogging", tooltip: "main-card.tooltip.jogging"},
    {section: "other-features", name: "bike-trailer", label: "main-card.chip.bike-trailer", tooltip: "main-card.tooltip.bike-trailer"},
    {section: "other-features", name: "eco-friendly", label: "main-card.chip.eco-friendly", tooltip: "main-card.tooltip.eco-friendly"},
    {section: "other-features", name: "large-basket", label: "main-card.chip.large-basket", tooltip: "main-card.tooltip.large-basket"},
    {section: "other-features", name: "hand-brake", label: "main-card.chip.hand-brake", tooltip: "main-card.tooltip.hand-brake"},
    {section: "other-features", name: "breezy-cot", label: "main-card.chip.breezy-cot", tooltip: "main-card.tooltip.breezy-cot"},
    {section: "fold", name: "folds-with-one-hand", label: "main-card.chip.folds-with-one-hand", tooltip: "main-card.tooltip.folds-with-one-hand"},
    {section: "fold", name: "folds-with-cot", label: "main-card.chip.folds-with-cot", tooltip: "main-card.tooltip.folds-with-cot"},
    {section: "terrain", name: "around-the-world", label: "main-card.chip.around-the-world", tooltip: "main-card.tooltip.around-the-world"},
    {section: "terrain", name: "all-terrain", label: "main-card.chip.all-terrain", tooltip: "main-card.tooltip.all-terrain"},
    {section: "terrain", name: "only-city", label: "main-card.chip.only-city", tooltip: "main-card.tooltip.only-city"},
    {section:"warranty", name: "1-year-warranty", label: "main-card.chip.1-year-warranty", tooltip: "main-card.tooltip.1-year-warranty"},
    {section:"warranty", name: "4-year-warranty", label: "main-card.chip.4-year-warranty", tooltip: "main-card.tooltip.4-year-warranty"},
    {section:"warranty", name: "3-year-warranty-if-registered-within-6-month", label: "main-card.chip.3-year-warranty-if-registered-within-6-month", tooltip: "main-card.tooltip.3-year-warranty-if-registered-within-6-month"},
    {section:"warranty", name: "2-year-warranty", label: "main-card.chip.2-year-warranty", tooltip: "main-card.tooltip.2-year-warranty"},
    {section:"warranty", name: "5-year-warranty", label: "main-card.chip.5-year-warranty", tooltip: "main-card.tooltip.5-year-warranty"},
    {section:"warranty", name: "7-years-transferrable-warranty-if-registered-within-6-month", label: "main-card.chip.7-years-transferrable-warranty-if-registered-within-6-month", tooltip: "main-card.tooltip.7-years-transferrable-warranty-if-registered-within-6-month"},
    {section:"warranty", name: "10-years-transferrable-warranty-if-registered-within-6-month", label: "main-card.chip.10-years-transferrable-warranty-if-registered-within-6-month", tooltip: "main-card.tooltip.10-years-transferrable-warranty-if-registered-within-6-month"},
    {section:"warranty", name: "lifetime-warranty-if-registered-within-6-month", label: "main-card.chip.lifetime-warranty-if-registered-within-6-month", tooltip: "main-card.tooltip.lifetime-warranty-if-registered-within-6-month"},
    {section:"warranty", name: "warranty-varied-by-retailers", label: "main-card.chip.warranty-varied-by-retailers", tooltip: "main-card.tooltip.warranty-varied-by-retailers"}
  ],
  stroller_sortings : [
      {value: 0, name: "priceAsc"},
      {value: 1, name: "priceDesc"},
      {value: 2, name: "abc"},
      {value: 3, name: "weightAsc"},
      {value: 4, name: "weightDesc"},
      {value: 5, name: "heightAsc"},
      {value: 6, name: "heightDesc"}
  ],
  stroller_info_open_dimensions_columns : [
    {
      key: "openHeight",
      label: "height",
    },
    {
      key: "openWidth",
      label: "width",
    },
    {
      key: "openLength",
      label: "length",
    }
  ],
  stroller_info_closed_dimensions_columns : [
    {
      key: "closedHeight",
      label: "closed-height",
    },
    {
      key: "closedWidth",
      label: "closed-width",
    },
    {
      key: "closedLength",
      label: "closed-length",
    }
  ],
  stroller_info_capacity_columns : [
    {
      key: "sumLoadCapacity",
      label: "sum-load-capacity",
    },
    {
      key: "seatLoadCapacity",
      label: "seat-load-capacity",
    },
    {
      key: "basketLoadCapacity",
      label: "basket-load-capacity",
    }
  ],
  stroller_info_weight_columns : [
    {
      key: "weight",
      label: "weight",
    }
  ],
  stroller_info_wheel_columns : [
    {
      key: "frontWheelSize",
      label: "front-wheel",
    },
    {
      key: "backWheelSize",
      label: "back-wheel",
    }
  ],
  stroller_info_seat_columns : [
    {
      key: "backrestHeight",
      label: "seat-height",
    },
    {
      key: "seatWidth",
      label: "seat-width",
    }
  ],

  carseat_tags: [
    {section: "base",name: "baseless-isofix", label: "main-card.chip.baseless-isofix", tooltip: "main-card.tooltip.baseless-isofix"},
    {section: "base",name: "base-with-car-seat-belt", label: "main-card.chip.base-with-car-seat-belt", tooltip: "main-card.tooltip.base-with-car-seat-belt"},
    {section: "base",name: "base-with-belt", label: "main-card.chip.base-with-belt", tooltip: "main-card.tooltip.base-with-belt"},
    {section: "base",name: "no-isofix", label: "main-card.chip.no-isofix", tooltip: "main-card.tooltip.no-isofix"},
    {section: "base",name: "base-with-easy-in-out-slipping", label: "main-card.chip.base-with-easy-in-out-slipping", tooltip: "main-card.tooltip.base-with-easy-in-out-slipping"},
    {section: "base",name: "adjustable-base", label: "main-card.chip.adjustable-base", tooltip: "main-card.tooltip.adjustable-base"},
    {section: "canopy", name: "xxl-suncanopy", label: "main-card.chip.xxl-suncanopy", tooltip: "main-card.tooltip.xxl-suncanopy"},
    {section: "canopy", name: "xl-suncanopy", label: "main-card.chip.xl-suncanopy", tooltip: "main-card.tooltip.xl-suncanopy"},
    {section: "canopy", name: "normal-suncanopy", label: "main-card.chip.normal-suncanopy", tooltip: "main-card.tooltip.normal-suncanopy"},
    {section: "canopy", name: "flip-out-eyeshade", label: "main-card.chip.flip-out-eyeshade", tooltip: "main-card.tooltip.flip-out-eyeshade"},
    {section: "kid", name: "baby", label: "main-card.chip.baby", tooltip: "main-card.tooltip.baby"},
    {section: "kid", name: "toddler", label: "main-card.chip.toddler", tooltip: "main-card.tooltip.toddler"},
    {section: "kid", name: "kid", label: "main-card.chip.kid", tooltip: "main-card.tooltip.kid"},
    {section: "seat", name: "carrycot", label: "main-card.chip.carrycot", tooltip: "main-card.tooltip.carrycot"},
    {section: "other-features", name: "eco-friendly", label: "main-card.chip.eco-friendly", tooltip: "main-card.tooltip.eco-friendly"},
    {section: "harness", name: "airbag", label: "main-card.chip.airbag", tooltip: "main-card.tooltip.airbag"},
    {section: "harness", name: "shield", label: "main-card.chip.shield", tooltip: "main-card.tooltip.shield"},
    {section: "harness", name: "3point-harness", label: "main-card.chip.3point-harness", tooltip: "main-card.tooltip.3point-harness"},
    {section: "harness", name: "car-harness", label: "main-card.chip.car-harness", tooltip: "main-card.tooltip.car-harness"},
    {section: "harness", name: "active-retract-harness", label: "main-card.chip.active-retract-harness", tooltip: "main-card.tooltip.active-retract-harness"},
    {section: "harness", name: "easy-in-harness", label: "main-card.chip.easy-in-harness", tooltip: "main-card.tooltip.easy-in-harness"},
    {section: "harness", name: "easy-to-harness-quiet", label: "main-card.chip.easy-to-harness-quiet", tooltip: "main-card.tooltip.easy-to-harness-quiet"},
    {section: "harness", name: "5point-harness", label: "main-card.chip.5point-harness", tooltip: "main-card.tooltip.5point-harness"},
    {section: "harness", name: "buckle-holder", label: "main-card.chip.buckle-holder", tooltip: "main-card.tooltip.buckle-holder"},
    {section: "harness", name: "magnetic-buckle-holder", label: "main-card.chip.magnetic-buckle-holder", tooltip: "main-card.tooltip.magnetic-buckle-holder"},
    {section: "seat", name: "breathable-mesh", label: "main-card.chip.breathable-mesh", tooltip: "main-card.tooltip.breathable-mesh"},
    {section: "seat", name: "3D-growth", label: "main-card.chip.3D-growth", tooltip: "main-card.tooltip.3D-growth"},
    {section: "seat", name: "toddler-seat-on-stroller", label: "main-card.chip.toddler-seat-on-stroller", tooltip: "main-card.toddler-seat-on-stroller"},
    {section: "seat", name: "machine-washable", label: "main-card.chip.machine-washable", tooltip: "main-card.tooltip.machine-washable"},
    {section: "seat", name: "rotating", label: "main-card.chip.rotating", tooltip: "main-card.tooltip.rotating"},
    {section: "seat", name: "full-lie-flat", label: "main-card.chip.full-lie-flat", tooltip: "main-card.tooltip.full-lie-flat"},
    {section: "seat", name: "lie-flat-in-car", label: "main-card.chip.lie-flat-in-car", tooltip: "main-card.tooltip.lie-flat-in-car"},
    {section: "seat", name: "close-lie-flat", label: "main-card.chip.close-lie-flat", tooltip: "main-card.tooltip.close-lie-flat"},
    {section: "seat", name: "one-hand-rotation", label: "main-card.chip.one-hand-rotation", tooltip: "main-card.tooltip.one-hand-rotation"},
    {section: "seat", name: "slide-tech", label: "main-card.chip.slide-tech", tooltip: "main-card.tooltip.slide-tech"},
    {section: "seat", name: "safe-cell", label: "main-card.chip.safe-cell", tooltip: "main-card.tooltip.safe-cell"},
    {section: "seat", name: "er-tech", label: "main-card.chip.er-tech", tooltip: "main-card.tooltip.er-tech"},
    {section: "seat", name: "kinetic-pods", label: "main-card.chip.kinetic-pods", tooltip: "main-card.tooltip.kinetic-pods"},
    {section: "seat", name: "modular", label: "main-card.chip.modular", tooltip: "main-card.tooltip.modular"},
    {section: "seat", name: "detachable-lightweight-carrier", label: "main-card.chip.detachable-lightweight-carrier", tooltip: "main-card.tooltip.detachable-lightweight-carrier"},
    {section: "seat", name: "g-cell", label: "main-card.chip.g-cell", tooltip: "main-card.tooltip.g-cell"},
    {section: "seat", name: "g-cell-2", label: "main-card.chip.g-cell-2", tooltip: "main-card.tooltip.g-cell-2"},
    {section: "seat", name: "two-seat-covers-included", label: "main-card.chip.two-seat-covers-included", tooltip: "main-card.tooltip.two-seat-covers-included"},
    {section: "seat", name: "extra-legroom", label: "main-card.chip.extra-legroom", tooltip: "main-card.tooltip.extra-legroom"},
    {section: "seat",name: "lightweight", label: "main-card.chip.lightweight", tooltip: "main-card.tooltip.car-seat-lightweight"},
    {section: "seat",name: "ultra-lightweight", label: "main-card.chip.ultra-lightweight", tooltip: "main-card.tooltip.car-seat-ultra-lightweight"},
    {section: "seat",name: "air-protect", label: "main-card.chip.air-protect", tooltip: "main-card.tooltip.air-protect"},
    {section: "seat",name: "Holmbergs-digital-safety", label: "main-card.chip.Holmbergs-digital-safety", tooltip: "main-card.tooltip.Holmbergs-digital-safety"},
    {section: "certification",name: "R129/03-i-Size", label: "main-card.chip.R129-i-Size", tooltip: "main-card.tooltip.R129-i-Size"},
    {section: "certification",name: "ECE-R44-certified", label: "main-card.chip.ECE-R44-certified", tooltip: "main-card.tooltip.ECE-R44-certified"},
    {section: "certification",name: "TÜV-certified-for-airplane", label: "main-card.chip.TÜV-certified-for-airplane", tooltip: "main-card.tooltip.TÜV-certified-for-airplane"},
    {section: "certification",name: "greenguard-certified", label: "main-card.chip.greenguard-certified", tooltip: "main-card.tooltip.greenguard-certified"},
    {section: "certification",name: "agr-certified", label: "main-card.chip.agr-certified", tooltip: "main-card.tooltip.agr-certified"},
  ],
  carseat_sortings : [
    {value: 0, name: "abc"},
    {value: 1, name: "bestAdacAsc"},
    {value: 2, name: "bestAdacDesc"}
  ],
  carseat_adac : [
    {name: 'very-good', value: 'VERY_GOOD'},
    {name: 'good', value: 'GOOD'},
    {name: 'satisfactory', value: 'SATISFACTORY'},
    {name: 'poor', value: 'POOR'}
  ],
  carseat_facing: [
    {name: 'rear', value: 'REAR'},
    {name: 'forward', value: 'FORWARD'},
]
  

};
