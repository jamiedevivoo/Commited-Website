var stages = [
    {
        stage_id: 0,
        video_id: 0,
        
        is_start: true,
        is_end: false,
        
        decision:false,
        default_outcome: 0,
        options: [
            {
                index: 0,
                title: null,
                
                flags_required: null,
                
                video_id: null,
                flags_set: null,
                
                next_stage: 1
            }
        ],
    },
    {
        stage_id: 1,
        video_id: 1,
        
        is_start: false,
        is_end: false,
        
        decision:true,
        default_outcome: null,
        outcome: [
            {
                index: 0,
                title: "Pick Torch Up",
                
                flags_required: null,
                
                video_id: 2,
                flags_set: null,
                
                next_stage: 2
            }
        ]
    },
    {
        stage_id: 2,
        video_id: 3,
        
        is_start: false,
        is_end: false,
        
        decision:true,
        default_outcome: null,
        outcome: [
            {
                index: 0,
                title: "Pick Wallet Up",
                
                flags_required: null,
                
                video_id: 4,
                flags_set: null,
                
                next_stage: 3
            }
        ]
    },
    {
        stage_id: 3,
        video_id: 5,
        
        is_start: false,
        is_end: false,
        
        decision:true,
        default_outcome: null,
        outcome: [
            {
                index: 0,
                title: "First Decision",
                
                flags_required: null,
                
                video_id: 6,
                flags_set: null,
                
                next_stage: 4
            }
        ]
    },
    {
        stage_id: 4,
        video_id: 7,
        
        is_start: false,
        is_end: true,
        
        decision:true,
        default_outcome: null,
        outcome: [
            {
                index: 0,
                title: "First Decision",
                
                flags_required: null,
                
                video_id: 8,
                flags_set: null,
                
                next_stage: 3
            },
            {
                index: 1,
                title: "First Decision",
                
                flags_required: null,
                
                video_id: 9,
                flags_set: null,
                
                next_stage: 6
            }
        ]
    }
]

var videos = [
    {
        video_id:0,
        source:'film/1-1s.mp4',
        blob: null
    },
    {
        video_id:1,
        source:'film/1s.mp4',
        blob: null
    },
    {
        video_id:2,
        source:'film/1s-2-2s.mp4',
        blob: null
    },
    {
        video_id:3,
        source:'film/2s.mp4',
        blob: null
    },
    {
        video_id:4,
        source:'film/2s-2.1-2.1s.mp4',
        blob: null
    },
    {
        video_id:5,
        source:'film/2.1s.mp4',
        blob: null
    },
    {
        video_id:6,
        source:'film/2.1s-3-3s.mp4',
        blob: null
    },
    {
        video_id:7,
        source:'film/3s.mp4',
        blob: null
    },
    {
        video_id: 8,
        source:'film/3s-3a-5-5s.mp4',
        blob: null
    },
    {
        video_id: 9,
        source:'film/3s-3b-5-5s.mp4',
        blob: null
    },
    {
        video_id: 10,
        source:'film/2.1s-4-4s.mp4',
        blob: null
    },
    {
        video_id: 11,
        source:'film/4s.mp4',
        blob: null
    },
    {
        video_id: 12,
        source:'film/4s-4a-5-5s.mp4',
        blob: null
    },
    {
        video_id: 13,
        source:'film/4s-4b-5-5s.mp4',
        blob: null
    },
    {
        video_id: 14,
        source:'film/5s.mp4',
        blob: null
    },
    {
        video_id: 15,
        source:'film/5s-5a-6-6s.mp4',
        blob: null
    },
    {
        video_id: 16,
        source:'film/5s-5b-6-6s.mp4',
        blob: null
    },
    {
        video_id: 17,
        source:'film/6s.mp4',
        blob: null
    },
    {
        video_id: 18,
        source:'film/6s-7-7s.mp4',
        blob: null
    },
    {
        video_id: 19,
        source:'film/7s.mp4',
        blob: null
    },
    {
        video_id: 20,
        source:'film/7s-7a-9-10s.mp4',
        blob: null
    },
    {
        video_id: 21,
        source:'film/7s-7b-9-10s.mp4',
        blob: null
    },
    {
        video_id: 22,
        source:'film/6s-8-8s.mp4',
        blob: null
    },
    {
        video_id: 23,
        source:'film/8s.mp4',
        blob: null
    },
    {
        video_id: 24,
        source:'film/8s-8a-9-10s.mp4',
        blob: null
    },
    {
        video_id: 25,
        source:'film/8s-8b-9-10s.mp4',
        blob: null
    },
    {
        video_id: 26,
        source:'film/10s.mp4',
        blob: null
    },
    {
        video_id: 27,
        source:'film/10s-10.mp4',
        blob: null
    },
    {
        video_id: 28,
        source:'film/11s.mp4',
        blob: null
    },
    {
        video_id: 29,
        source:'film/11x.mp4',
        moment_id:8,
        start: false,
        end: false,
        blob: null
    },
    {
        video_id: 30,
        source:'film/11y.mp4',
        blob: null
    },
    {
        video_id: 31,
        source:'film/11z.mp4',
        blob: null
    },
    {
        video_id: 32,
        source:'film/11zalt.mp4',
        blob: null
    },
    {
        video_id: 33,
        source:'film/12s.mp4',
        blob: null
    },
    {
        video_id: 34,
        source:'film/12x.mp4',
        blob: null
    },
    {
        video_id: 35,
        source:'film/12y.mp4',
        blob: null
    },
    {
        video_id: 36,
        source:'film/12z.mp4',
        blob: null
    },
    {
        video_id: 37,
        source:'film/13s.mp4',
        blob: null
    },
    {
        video_id: 38,
        source:'film/13y.mp4',
        blob: null
    },
    {
        video_id: 39,
        source:'film/13z.mp4',
        blob: null
    }
];