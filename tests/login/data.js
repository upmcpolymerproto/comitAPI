const uuid = require('uuid/v4');

let data = {};

data.System = [
    {
        'Id': uuid(),
        'Name': 'comit',
        'Description': ''
    },
    {
        'Id': uuid(),
        'Name': 'mars',
        'Description': ''
    }
];

data.Group = [
    {
        'Id': uuid(),
        'Name': 'ETI - All',
        'SystemId': data.System[0].Id
    },
    {
        'Id': uuid(),
        'Name': 'ETI - Software Integration',
        'SystemId': data.System[0].Id
    }
];

data.Tag = [
    {
        'Id': uuid(),
        'Name': 'comit analyst',
        'Description': '',
        'GroupId': data.Group[0].Id
    },
    {
        'Id': uuid(),
        'Name': 'comit developer',
        'Description': '',
        'GroupId': data.Group[1].Id
    }
];

data.ComponentType = [
    {
        'Id': uuid(),
        'Name': 'send',
        'Description': ''
    },
    {
        'Id': uuid(),
        'Name': 'transform',
        'Description': ''
    },
    {
        'Id': uuid(),
        'Name': 'receive',
        'Description': ''
    }
]

data.Component = [
    {
        'Id': uuid(),
        'Name': 'EPIC',
        'Description': '',
        'SystemId': data.System[0].Id,
        'ComponentTypeId': data.ComponentType[0].Id
    },
    {
        'Id': uuid(),
        'Name': 'Medipac',
        'Description': '',
        'SystemId': data.System[0].Id,
        'ComponentTypeId': data.ComponentType[0].Id
    },
    {
        'Id': uuid(),
        'Name': 'EMPI',
        'Description': '',
        'SystemId': data.System[0].Id,
        'ComponentTypeId': data.ComponentType[1].Id
    },
    {
        'Id': uuid(),
        'Name': 'dbMotion',
        'Description': '',
        'SystemId': data.System[0].Id,
        'ComponentTypeId': data.ComponentType[2].Id
    }
]

data.ComponentTag = [
    {
        'Id': uuid(),
        'TagId': data.Tag[0].Id,
        'ComponentId': data.Component[0].Id
    },
    {
        'Id': uuid(),
        'TagId': data.Tag[0].Id,
        'ComponentId': data.Component[1].Id
    },
    {
        'Id': uuid(),
        'TagId': data.Tag[0].Id,
        'ComponentId': data.Component[2].Id
    },
    {
        'Id': uuid(),
        'TagId': data.Tag[0].Id,
        'ComponentId': data.Component[3].Id
    },
    {
        'Id': uuid(),
        'TagId': data.Tag[1].Id,
        'ComponentId': data.Component[0].Id
    },
    {
        'Id': uuid(),
        'TagId': data.Tag[1].Id,
        'ComponentId': data.Component[1].Id
    },
    {
        'Id': uuid(),
        'TagId': data.Tag[1].Id,
        'ComponentId': data.Component[2].Id
    },
    {
        'Id': uuid(),
        'TagId': data.Tag[1].Id,
        'ComponentId': data.Component[3].Id
    }
]

data.PermissionType = [
    {
        'Id': uuid(),
        'Code': 'All',
        'Name': '',
        'isComponentType': false
    },
    {
        'Id': uuid(),
        'Code': 'View All Components',
        'Name': '',
        'isComponentType': false
    },
    {
        'Id': uuid(),
        'Code': 'Start/Stop All Components',
        'Name': '',
        'isComponentType': false
    },
    {
        'Id': uuid(),
        'Code': 'Show Stage Components',
        'Name': '',
        'isComponentType': false
    },
    {
        'Id': uuid(),
        'Code': 'Create Categories',
        'Name': '',
        'isComponentType': false
    },
    {
        'Id': uuid(),
        'Code': 'Modify Categories',
        'Name': '',
        'isComponentType': false
    },
    {
        'Id': uuid(),
        'Code': 'Modify Permissions',
        'Name': '',
        'isComponentType': false
    },
    {
        'Id': uuid(),
        'Code': 'Modify Roles',
        'Name': '',
        'isComponentType': false
    },
    {
        'Id': uuid(),
        'Code': 'Modify Component Information',
        'Name': '',
        'isComponentType': true
    },
    {
        'Id': uuid(),
        'Code': 'View Components',
        'Name': '',
        'isComponentType': true
    },
    {
        'Id': uuid(),
        'Code': 'Start/Stop Components',
        'Name': '',
        'isComponentType': true
    },
    {
        'Id': uuid(),
        'Code': 'Clear Queues',
        'Name': '',
        'isComponentType': true
    },
    {
        'Id': uuid(),
        'Code': 'Delete First Message in Queue',
        'Name': '',
        'isComponentType': true
    },
    {
        'Id': uuid(),
        'Code': 'View Queue Message Data',
        'Name': '',
        'isComponentType': true
    },
    {
        'Id': uuid(),
        'Code': 'View Messages',
        'Name': '',
        'isComponentType': true
    },
    {
        'Id': uuid(),
        'Code': 'Replay Messages',
        'Name': '',
        'isComponentType': true
    }
];

data.Permission = [
    {
        'Id': uuid(),
        'PermissionTypeId': data.PermissionType[0].Id,
        'Value': true
    },
    {
        'Id': uuid(),
        'PermissionTypeId': data.PermissionType[1].Id,
        'Value': false
    },
    {
        'Id': uuid(),
        'PermissionTypeId': data.PermissionType[2].Id,
        'Value': true
    },
    {
        'Id': uuid(),
        'PermissionTypeId': data.PermissionType[3].Id,
        'Value': true
    },
    {
        'Id': uuid(),
        'PermissionTypeId': data.PermissionType[4].Id,
        'Value': false
    },
    {
        'Id': uuid(),
        'PermissionTypeId': data.PermissionType[5].Id,
        'Value': true
    },
    {
        'Id': uuid(),
        'PermissionTypeId': data.PermissionType[6].Id,
        'Value': false
    },
    {
        'Id': uuid(),
        'PermissionTypeId': data.PermissionType[7].Id,
        'Value': false
    },
    {
        'Id': uuid(),
        'PermissionTypeId': data.PermissionType[0].Id,
        'Value': false
    },
    {
        'Id': uuid(),
        'PermissionTypeId': data.PermissionType[1].Id,
        'Value': true
    },
    {
        'Id': uuid(),
        'PermissionTypeId': data.PermissionType[2].Id,
        'Value': false
    },
    {
        'Id': uuid(),
        'PermissionTypeId': data.PermissionType[3].Id,
        'Value': true
    },
    {
        'Id': uuid(),
        'PermissionTypeId': data.PermissionType[4].Id,
        'Value': false
    },
    {
        'Id': uuid(),
        'PermissionTypeId': data.PermissionType[5].Id,
        'Value': false
    },
    {
        'Id': uuid(),
        'PermissionTypeId': data.PermissionType[6].Id,
        'Value': true
    },
    {
        'Id': uuid(),
        'PermissionTypeId': data.PermissionType[7].Id,
        'Value': true
    },
    {
        'Id': uuid(),
        'PermissionTypeId': data.PermissionType[8].Id,
        'Value': true
    },
    {
        'Id': uuid(),
        'PermissionTypeId': data.PermissionType[9].Id,
        'Value': false
    },
    {
        'Id': uuid(),
        'PermissionTypeId': data.PermissionType[10].Id,
        'Value': true
    },
    {
        'Id': uuid(),
        'PermissionTypeId': data.PermissionType[11].Id,
        'Value': true
    },
    {
        'Id': uuid(),
        'PermissionTypeId': data.PermissionType[12].Id,
        'Value': false
    },
    {
        'Id': uuid(),
        'PermissionTypeId': data.PermissionType[13].Id,
        'Value': true
    },
    {
        'Id': uuid(),
        'PermissionTypeId': data.PermissionType[14].Id,
        'Value': false
    },
    {
        'Id': uuid(),
        'PermissionTypeId': data.PermissionType[15].Id,
        'Value': false
    },
    {
        'Id': uuid(),
        'PermissionTypeId': data.PermissionType[8].Id,
        'Value': true
    },
    {
        'Id': uuid(),
        'PermissionTypeId': data.PermissionType[9].Id,
        'Value': true
    },
    {
        'Id': uuid(),
        'PermissionTypeId': data.PermissionType[10].Id,
        'Value': true
    },
    {
        'Id': uuid(),
        'PermissionTypeId': data.PermissionType[11].Id,
        'Value': true
    },
    {
        'Id': uuid(),
        'PermissionTypeId': data.PermissionType[12].Id,
        'Value': true
    },
    {
        'Id': uuid(),
        'PermissionTypeId': data.PermissionType[13].Id,
        'Value': true
    },
    {
        'Id': uuid(),
        'PermissionTypeId': data.PermissionType[14].Id,
        'Value': true
    },
    {
        'Id': uuid(),
        'PermissionTypeId': data.PermissionType[15].Id,
        'Value': true
    },
];

data.TagPermission = [
    {
        'Id': uuid(),
        'TagId': data.Tag[0].Id,
        'PermissionId': data.Permission[16].Id
    },
    {
        'Id': uuid(),
        'TagId': data.Tag[0].Id,
        'PermissionId': data.Permission[17].Id
    },
    {
        'Id': uuid(),
        'TagId': data.Tag[0].Id,
        'PermissionId': data.Permission[18].Id
    },
    {
        'Id': uuid(),
        'TagId': data.Tag[0].Id,
        'PermissionId': data.Permission[19].Id
    },
    {
        'Id': uuid(),
        'TagId': data.Tag[0].Id,
        'PermissionId': data.Permission[20].Id
    },
    {
        'Id': uuid(),
        'TagId': data.Tag[0].Id,
        'PermissionId': data.Permission[21].Id
    },
    {
        'Id': uuid(),
        'TagId': data.Tag[0].Id,
        'PermissionId':data.Permission[22].Id
    },
    {
        'Id': uuid(),
        'TagId': data.Tag[0].Id,
        'PermissionId': data.Permission[23].Id
    },
    {
        'Id': uuid(),
        'TagId': data.Tag[1].Id,
        'PermissionId': data.Permission[24].Id
    },
    {
        'Id': uuid(),
        'TagId': data.Tag[1].Id,
        'PermissionId': data.Permission[25].Id
    },
    {
        'Id': uuid(),
        'TagId': data.Tag[1].Id,
        'PermissionId': data.Permission[26].Id
    },
    {
        'Id': uuid(),
        'TagId': data.Tag[1].Id,
        'PermissionId': data.Permission[27].Id
    },
    {
        'Id': uuid(),
        'TagId': data.Tag[1].Id,
        'PermissionId': data.Permission[28].Id
    },
    {
        'Id': uuid(),
        'TagId': data.Tag[1].Id,
        'PermissionId': data.Permission[29].Id
    },
    {
        'Id': uuid(),
        'TagId': data.Tag[1].Id,
        'PermissionId': data.Permission[30].Id
    },
    {
        'Id': uuid(),
        'TagId': data.Tag[1].Id,
        'PermissionId': data.Permission[31].Id
    }
]

data.GroupPermission = [
    {
        'Id': uuid(),
        'GroupId': data.Group[0].Id,
        'PermissionId': data.Permission[0].Id
    },
    {
        'Id': uuid(),
        'GroupId': data.Group[0].Id,
        'PermissionId': data.Permission[1].Id
    },
    {
        'Id': uuid(),
        'GroupId': data.Group[0].Id,
        'PermissionId': data.Permission[2].Id
    },
    {
        'Id': uuid(),
        'GroupId': data.Group[0].Id,
        'PermissionId': data.Permission[3].Id
    },
    {
        'Id': uuid(),
        'GroupId': data.Group[0].Id,
        'PermissionId': data.Permission[4].Id
    },
    {
        'Id': uuid(),
        'GroupId': data.Group[0].Id,
        'PermissionId': data.Permission[5].Id
    },
    {
        'Id': uuid(),
        'GroupId': data.Group[0].Id,
        'PermissionId': data.Permission[6].Id
    },
    {
        'Id': uuid(),
        'GroupId': data.Group[0].Id,
        'PermissionId': data.Permission[7].Id
    },
    {
        'Id': uuid(),
        'GroupId': data.Group[1].Id,
        'PermissionId': data.Permission[8].Id
    },
    {
        'Id': uuid(),
        'GroupId': data.Group[1].Id,
        'PermissionId': data.Permission[9].Id
    },
    {
        'Id': uuid(),
        'GroupId': data.Group[1].Id,
        'PermissionId': data.Permission[10].Id
    },
    {
        'Id': uuid(),
        'GroupId': data.Group[1].Id,
        'PermissionId': data.Permission[11].Id
    },
    {
        'Id': uuid(),
        'GroupId': data.Group[1].Id,
        'PermissionId': data.Permission[12].Id
    },
    {
        'Id': uuid(),
        'GroupId': data.Group[1].Id,
        'PermissionId': data.Permission[13].Id
    },
    {
        'Id': uuid(),
        'GroupId': data.Group[1].Id,
        'PermissionId': data.Permission[14].Id
    },
    {
        'Id': uuid(),
        'GroupId': data.Group[1].Id,
        'PermissionId': data.Permission[15].Id
    }
];

data.Role = [];

module.exports = data;