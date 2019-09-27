//
//  main.m
//  scroll-swap
//
//  Created by Simon Aronsson on 2019-08-30.
//  Copyright © 2019 arctic bit. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <IOKit/hid/IOHIDLib.h>

extern int _CGSDefaultConnection(void);
extern void CGSSetSwipeScrollDirection(int cid, BOOL dir);

void SetNaturalScroll(BOOL naturalScroll) {
    CGSSetSwipeScrollDirection(_CGSDefaultConnection(), naturalScroll);
    CFPreferencesSetAppValue(CFSTR("com.apple.swipescrolldirection"), (CFBooleanRef)@(naturalScroll), kCFPreferencesAnyApplication);
    CFPreferencesAppSynchronize(kCFPreferencesAnyApplication);
    [NSDistributedNotificationCenter.defaultCenter postNotificationName:@"SwipeScrollDirectionDidChangeNotification" object:nil];
}

int main(int argc, const char * argv[]) {
    if (argc != 2) {
        printf("usage: scroll-direction [natural|inverted]");
        exit(1);
    } else if (strcmp( argv[1], "natural") == 0) {
        SetNaturalScroll(true);
        printf("enabled");
    } else if (strcmp( argv[1], "inverted") == 0) {
        SetNaturalScroll(false);
        printf("disabled");
    } else {
        printf("usage: scroll-direction [natural|inverted]");
        exit(1);
    }
    exit(0);
}
