//
//  Database.swift
//  Streamism
//
//  Created by Brian Ault on 8/21/17.
//  Copyright © 2017 Brian Ault. All rights reserved.
//

import Foundation
import FirebaseDatabase


class StreamDatabase {
    var ref: DatabaseReference!
    var handle:UInt = 0
    private var masterList = [StreamCategory]()
    
    init() {
        ref = Database.database().reference(withPath: "-KbHuqtKNuu96svHRgjz")
        handle = ref.observe(.value, with: { (snapshot) in
            //print("Streamism data - \(String(describing: snapshot.value))")

            let value = snapshot.value as? [String : AnyObject] ?? [:]
            let cats = value["streams"] as? [[String: AnyObject]] ?? [[:]]
            for category in cats {
                let cat = category["id"] as? String
                let streams = category["streams"] as? [[String:String]]
                let streamCat = StreamCategory(type:StreamType(rawValue: cat!)!,data:streams!)
                self.masterList.append(streamCat)
            }
        })
    }
    
    
    
    func shuffle(list:[StreamCategory], categories:[StreamType]) -> [Stream] {
        var filteredList = [Stream]()
        var filteredCats = [StreamCategory]()
        
        //filter out cats if necessary - may move this and pass in filtered list
        for type in categories {
            for cat in list {
                if type.rawValue == cat.type.rawValue {
                    filteredCats.append(cat)
                }
            }
        }
        
        //get max length
        
        //Sort 1 of each cat at a time - better way?
        //go through each category - make temp array holding i element of each
        //random sort temp array
        //add array elements to final list
        
        return filteredList
    }
}
