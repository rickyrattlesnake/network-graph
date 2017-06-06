let data = {
    nodes: [
        {
            id: 'n1',
            payload: {
                type: 'router',
            },
        },
        {
            id: 'n2',
            payload: {
                type: 'router',
            }
        },
        {
            id: 'n3',
            payload: {
                type: 'router',
            },
        },
        {
            id: 'n4',
            payload: {
                type: 'router',
            }
        },
    ],
    edges: [
        {
            id: 'e1',
            source: 'n1',
            dest: 'n2',
            payload: {
                latency: '1000',
            }
        },
        {
            id: 'e1',
            source: 'n2',
            dest: 'n3',
            payload: {
                latency: '1000',
            }
        },
        {
            id: 'e1',
            source: 'n3',
            dest: 'n4',
            payload: {
                latency: '1000',
            }
        },
    ],
    jumps: [
        {
            id: 'j1',
            source: 'n1',
            dest: 'n3',
            payload: {
                latency: '1000',
            }
        },
    ]
};