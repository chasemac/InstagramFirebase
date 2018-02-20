//
//  FirebaseUtils.swift
//  InstagramFirebase
//
//  Created by Chase McElroy on 2/20/18.
//  Copyright © 2018 Chase McElroy. All rights reserved.
//

import Foundation
import Firebase

extension Database {
    static func fetchUserWithUID(uid: String, completion: @escaping (User) -> ()) {
        Database.database().reference().child("users").child(uid).observeSingleEvent(of: .value, with: { (snapshot) in
            
            guard let userDictionary = snapshot.value as? [String: Any] else {return}
            let user = User(uid: uid, dictionary: userDictionary)
            completion(user)
        }) { (err) in
            print("failed to fetch users for post", err)
        }
    }
}
