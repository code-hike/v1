## Step 1

Choose File > New > File, select iOS as the platform, select the “SwiftUI View” template, and click Next. Name the new file `MapView.swift` and click Create.

![Create a new SwiftUI View](/images/create-new-swiftui-view.png)

## Step 2

Add an `import` statement for `MapKit`.

---

When you import SwiftUI and certain other frameworks in the same file, you gain access to SwiftUI-specific functionality provided by that framework.

```swift MapView.swift
import SwiftUI
import MapKit


struct MapView: View {
    var body: some View {
        Text("Hello, World!")
    }
}


#Preview {
    MapView()
}
```

## Step 3

Create a private computed variable that holds the region information for the map.

```swift MapView.swift
import SwiftUI
import MapKit


struct MapView: View {
    var body: some View {
        Text("Hello, World!")
    }


    private var region: MKCoordinateRegion {
        MKCoordinateRegion(
            center: CLLocationCoordinate2D(latitude: 34.011_286, longitude: -116.166_868),
            span: MKCoordinateSpan(latitudeDelta: 0.2, longitudeDelta: 0.2)
        )
    }
}


#Preview {
    MapView()
}
```
