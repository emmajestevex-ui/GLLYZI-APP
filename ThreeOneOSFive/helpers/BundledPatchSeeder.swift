import Foundation

enum BundledPatchSeeder {
    enum AssetIndexerVariant: String, CaseIterable, Identifiable {
        case pen
        case h5

        var id: String { rawValue }

        var label: String {
            switch self {
            case .pen: return "PEN"
            case .h5: return "H5"
            }
        }

        var bundleID: String {
            switch self {
            case .pen: return "com.dts.freefiremax"
            case .h5: return "com.dts.freefireth"
            }
        }

        var filename: String {
            switch self {
            case .pen: return "assetindexer.PENojQAQ-f9a1I6Dzjs0n1Z3rtVU~3D"
            case .h5: return "assetindexer.H5ak1JM1Eck~2FxRcJrEp~2FMzeuqmY~3D"
            }
        }
    }

    private struct ProjectSpec {
        let id: UUID
        let defaultName: String
        let legacyDefaultNames: Set<String>
        let requiredCapability: String?
        let bundleID: String
        let payloads: [PayloadSpec]

        init(
            id: UUID,
            defaultName: String,
            legacyDefaultNames: Set<String>,
            requiredCapability: String? = nil,
            bundleID: String = "com.dts.freefireth",
            payloads: [PayloadSpec]
        ) {
            self.id = id
            self.defaultName = defaultName
            self.legacyDefaultNames = legacyDefaultNames
            self.requiredCapability = requiredCapability
            self.bundleID = bundleID
            self.payloads = payloads
        }
    }

    private struct PayloadSpec {
        let directory: String
        let filenameCandidates: [String]
        let targetFilename: String?
        let remoteSlugs: Set<String>

        init(
            directory: String,
            filenameCandidates: [String],
            targetFilename: String? = nil,
            remoteSlugs: Set<String> = []
        ) {
            self.directory = directory
            self.filenameCandidates = filenameCandidates
            self.targetFilename = targetFilename
            self.remoteSlugs = remoteSlugs
        }
    }

    private enum SeedError: Error {
        case missingPayload(String)
        case emptyPayload(String)
    }

    private static let payloadDirectoryName = "BundledPatchPayloads"
    private static let seedDate = Date(timeIntervalSince1970: 0)
    private static let remotePatchCategories: Set<String> = ["patches", "shaders", "configs"]
    private static let assetIndexerProjectID = UUID(uuidString: "A55E0001-3105-4A55-9001-00000000BEEF")!
    private static let assetIndexerVariantKey = "greeg.assetIndexerVariant"
    private static let assetIndexerDirectory = "Documents/contentcache/Compulsory/ios/gameassetbundles/avatar"

    private static let projects = [
        ProjectSpec(
            id: assetIndexerProjectID,
            defaultName: "Asset Indexer",
            legacyDefaultNames: ["asse"],
            bundleID: "com.dts.freefiremax",
            payloads: [
                PayloadSpec(
                    directory: assetIndexerDirectory,
                    filenameCandidates: [
                        AssetIndexerVariant.pen.filename,
                        AssetIndexerVariant.h5.filename
                    ],
                    remoteSlugs: ["asset-indexer-ff-max"]
                ),
            ]
        ),
        ProjectSpec(
            id: UUID(uuidString: "A55E0003-3105-4A55-9001-00000000BEEF")!,
            defaultName: "Shaders",
            legacyDefaultNames: [],
            payloads: [
                PayloadSpec(
                    directory: "Documents/contentcache/Optional/ios/gameassetbundles",
                    filenameCandidates: [
                        "shaders.HPt9DZviTSXL9hpGW9QNOMigNLA~3D",
                        "shaders.HPt9DZviTSXL9hpGW9QNOMig-NLA~3D"
                    ],
                    remoteSlugs: ["shaders"]
                )
            ]
        ),
        ProjectSpec(
            id: UUID(uuidString: "A55E0002-0144-4A55-9001-00000000BEEF")!,
            defaultName: "144 fps",
            legacyDefaultNames: [],
            payloads: [
                PayloadSpec(
                    directory: "Library/Preferences",
                    filenameCandidates: [
                        "com.dts.freefireth.plist"
                    ],
                    remoteSlugs: ["144-fps"]
                )
            ]
        ),
        ProjectSpec(
            id: UUID(uuidString: "A55E0005-3105-4A55-9001-00000000BEEF")!,
            defaultName: "Aimbot Drag FF Max",
            legacyDefaultNames: [],
            bundleID: "com.dts.freefiremax",
            payloads: [
                PayloadSpec(
                    directory: "Documents",
                    filenameCandidates: [
                        "Assembly-CSharp-patch.bytes"
                    ],
                    remoteSlugs: ["aimbot-drag-ff-max-assembly"]
                ),
                PayloadSpec(
                    directory: "Documents",
                    filenameCandidates: [
                        "localConfig.json"
                    ],
                    remoteSlugs: ["aimbot-drag-ff-max-config"]
                )
            ]
        ),
        ProjectSpec(
            id: UUID(uuidString: "A55E0004-3105-4A55-9001-00000000BEEF")!,
            defaultName: "TIO GREEG",
            legacyDefaultNames: [],
            requiredCapability: LicenseEntitlements.specialAssetIndexer,
            payloads: [
                PayloadSpec(
                    directory: "Documents/contentcache/Compulsory/ios/gameassetbundles/avatar",
                    filenameCandidates: [
                        "assetindexer.tio-greeg927394hd"
                    ],
                    targetFilename: "assetindexer.PENojQAQ-f9a1I6Dzjs0n1Z3rtVU~3D",
                    remoteSlugs: ["tio-greeg"]
                )
            ]
        )
    ]

    private static var activeProjects: [ProjectSpec] {
        projects.filter { spec in
            if spec.payloads.contains(where: {
                RemoteContentLibrary.isBuiltInDisabled(
                    bundleID: effectiveBundleID(for: spec),
                    relativePath: targetPath(for: $0),
                    slugs: $0.remoteSlugs
                )
            }) {
                return false
            }
            guard let capability = spec.requiredCapability else { return true }
            return LicenseEntitlements.has(capability)
        }
    }

    static var projectIDs: Set<UUID> {
        Set(activeProjects.map { $0.id }).union(remoteProjectIDs())
    }

    static func sortRank(for id: UUID) -> Int {
        if let index = projects.firstIndex(where: { $0.id == id }) {
            return index
        }
        if let index = sortedRemoteProjectIDs().firstIndex(of: id) {
            return projects.count + index
        }
        return Int.max
    }

    static var selectedAssetIndexerVariant: AssetIndexerVariant {
        let raw = UserDefaults.standard.string(forKey: assetIndexerVariantKey) ?? AssetIndexerVariant.pen.rawValue
        return AssetIndexerVariant(rawValue: raw) ?? .pen
    }

    static func setAssetIndexerVariant(_ variant: AssetIndexerVariant, fileManager: FileManager = .default) {
        UserDefaults.standard.set(variant.rawValue, forKey: assetIndexerVariantKey)
        seedIfNeeded(fileManager: fileManager)
    }

    static func isAssetIndexerProject(_ project: PatchProject) -> Bool {
        project.id == assetIndexerProjectID
    }

    static func isBuiltInRemoteFile(_ file: RemoteContentFile) -> Bool {
        let requestedBundle = normalizedBundleID(file.targetBundleID)
        let requestedSlug = normalizedSlug(file.slug)
        return projects
            .contains { spec in
                spec.payloads.contains { payload in
                    let slugMatches = payload.remoteSlugs.map(normalizedSlug).contains(requestedSlug)
                    return slugMatches && normalizedBundleID(spec.bundleID) == requestedBundle
                }
            }
    }

    static func seedIfNeeded(fileManager: FileManager = .default) {
        for spec in activeProjects {
            do {
                try seed(spec, fileManager: fileManager)
                log("patch: bundled GREEG patch \(spec.defaultName) is ready")
            } catch SeedError.missingPayload(let filename) {
                log("patch: bundled payload missing for \(spec.defaultName): \(filename)")
            } catch SeedError.emptyPayload(let filename) {
                log("patch: bundled payload is empty for \(spec.defaultName): \(filename)")
            } catch {
                log("patch: bundled patch \(spec.defaultName) could not be prepared: \(error.localizedDescription)")
            }
        }
        seedRemoteProjects(fileManager: fileManager)
    }

    private static func seed(_ spec: ProjectSpec, fileManager: FileManager) throws {
        let existingItem = PatchProjectLibrary.load(fileManager: fileManager)
            .first { $0.id == spec.id }
        let project = try makeProject(
            spec,
            existingProject: existingItem?.project,
            fileManager: fileManager
        )

        if let existingItem {
            try refreshExistingPackage(existingItem, with: project, fileManager: fileManager)
        } else {
            let encoded = try PatchPackageCodec.encodeLegacyV1(project: project, password: nil)
            _ = try PatchProjectLibrary.save(
                data: encoded.data,
                projectName: project.name,
                fileManager: fileManager
            )
        }

        try? PatchWorkspaceService.deleteWorkspace(projectID: spec.id, fileManager: fileManager)
    }

    private static func makeProject(
        _ spec: ProjectSpec,
        existingProject: PatchProject?,
        fileManager: FileManager
    ) throws -> PatchProject {
        let remoteOverride = spec.payloads.compactMap {
            RemoteContentLibrary.installedFile(
                matching: targetPath(for: $0),
                slugs: $0.remoteSlugs,
                bundleID: effectiveBundleID(for: spec),
                fileManager: fileManager
            )?.file
        }.first
        let effectiveBundleID = remoteOverride?.targetBundleID ?? effectiveBundleID(for: spec)
        let rules = try spec.payloads.map { payload in
            try makeRule(payload, fallbackBundleID: effectiveBundleID, fileManager: fileManager)
        }
        let existingName = existingProject?.name.trimmingCharacters(in: .whitespacesAndNewlines) ?? ""
        let name: String
        if let remoteName = remoteOverride?.name.trimmingCharacters(in: .whitespacesAndNewlines),
           !remoteName.isEmpty {
            name = remoteName
        } else if existingName.isEmpty || spec.legacyDefaultNames.contains(existingName) {
            name = spec.defaultName
        } else {
            name = existingName
        }

        return PatchProject(
            id: spec.id,
            name: name,
            createdAt: existingProject?.createdAt ?? seedDate,
            updatedAt: remoteOverride == nil ? (existingProject?.updatedAt ?? seedDate) : Date(),
            bundleIdentifiers: [effectiveBundleID],
            directories: [],
            rules: rules
        )
    }

    private static func makeRule(_ spec: PayloadSpec, fallbackBundleID: String, fileManager: FileManager) throws -> PatchRule {
        let bundledPayloadURL = try payloadURL(for: spec, fileManager: fileManager)
        let targetPath = targetPath(for: spec)

        let remoteMatch = RemoteContentLibrary.installedFile(
            matching: targetPath,
            slugs: spec.remoteSlugs,
            bundleID: fallbackBundleID,
            fileManager: fileManager
        )
        let payloadURL = remoteMatch?.url ?? bundledPayloadURL
        let data = try Data(contentsOf: payloadURL, options: .mappedIfSafe)
        guard !data.isEmpty else { throw SeedError.emptyPayload(payloadURL.lastPathComponent) }
        let replacementFilename = remoteMatch.map { "Remote v\($0.file.version) - \($0.file.fileName)" }
            ?? payloadURL.lastPathComponent
        let effectiveBundleID = remoteMatch?.file.targetBundleID ?? fallbackBundleID

        return PatchRule(
            bundleID: effectiveBundleID,
            relativePath: targetPath,
            replacementFilename: replacementFilename,
            replacementData: data
        )
    }

    private static func payloadURL(for spec: PayloadSpec, fileManager: FileManager) throws -> URL {
        guard let payloadRoot = Bundle.main.url(
            forResource: payloadDirectoryName,
            withExtension: nil
        ) else {
            throw SeedError.missingPayload(spec.filenameCandidates[0])
        }

        let candidates: [String]
        if spec.directory == assetIndexerDirectory,
           spec.filenameCandidates.contains(AssetIndexerVariant.pen.filename) {
            candidates = [selectedAssetIndexerVariant.filename]
                + spec.filenameCandidates.filter { $0 != selectedAssetIndexerVariant.filename }
        } else {
            candidates = spec.filenameCandidates
        }

        for filename in candidates {
            let candidate = payloadRoot.appendingPathComponent(filename, isDirectory: false)
            if fileManager.fileExists(atPath: candidate.path) {
                return candidate
            }
        }

        throw SeedError.missingPayload(spec.filenameCandidates[0])
    }

    private static func refreshExistingPackage(
        _ item: PatchLibraryItem,
        with project: PatchProject,
        fileManager: FileManager
    ) throws {
        guard let contentKey = item.contentKey else {
            try PatchProjectLibrary.delete(item, fileManager: fileManager)
            let encoded = try PatchPackageCodec.encodeLegacyV1(project: project, password: nil)
            _ = try PatchProjectLibrary.save(
                data: encoded.data,
                projectName: project.name,
                fileManager: fileManager
            )
            return
        }

        if item.project == project { return }

        let original = try PatchProjectLibrary.readPackage(at: item.packageURL)
        let updated = try PatchPackageCodec.update(
            original,
            project: project,
            contentKey: contentKey,
            schemaVersion: 1
        )
        _ = try PatchProjectLibrary.save(
            data: updated,
            projectName: project.name,
            existingURL: item.packageURL,
            fileManager: fileManager
        )
    }

    private static func seedRemoteProjects(fileManager: FileManager) {
        let remoteFiles = standaloneRemotePatchFiles(fileManager: fileManager)
        guard !remoteFiles.isEmpty else { return }
        let existingItems = PatchProjectLibrary.load(fileManager: fileManager)

        for file in remoteFiles {
            guard let projectID = remoteProjectID(for: file),
                  let payloadURL = RemoteContentLibrary.localFileURL(for: file, fileManager: fileManager) else {
                continue
            }

            do {
                let existingItem = existingItems.first { $0.id == projectID }
                let project = try makeRemoteProject(
                    from: file,
                    projectID: projectID,
                    payloadURL: payloadURL,
                    existingProject: existingItem?.project
                )
                if let existingItem {
                    try refreshExistingPackage(existingItem, with: project, fileManager: fileManager)
                } else {
                    let encoded = try PatchPackageCodec.encodeLegacyV1(project: project, password: nil)
                    _ = try PatchProjectLibrary.save(
                        data: encoded.data,
                        projectName: project.name,
                        fileManager: fileManager
                    )
                }
                try? PatchWorkspaceService.deleteWorkspace(projectID: projectID, fileManager: fileManager)
                log("patch: remote patch \(project.name) is ready")
            } catch {
                log("patch: remote patch \(file.name) could not be prepared: \(error.localizedDescription)")
            }
        }
    }

    private static func makeRemoteProject(
        from file: RemoteContentFile,
        projectID: UUID,
        payloadURL: URL,
        existingProject: PatchProject?
    ) throws -> PatchProject {
        let data = try Data(contentsOf: payloadURL, options: .mappedIfSafe)
        guard !data.isEmpty else { throw SeedError.emptyPayload(payloadURL.lastPathComponent) }
        let remoteName = file.name.trimmingCharacters(in: .whitespacesAndNewlines)
        let projectName = remoteName.isEmpty ? file.fileName : remoteName

        return PatchProject(
            id: projectID,
            name: projectName,
            createdAt: existingProject?.createdAt ?? seedDate,
            updatedAt: Date(),
            bundleIdentifiers: [file.targetBundleID],
            directories: [],
            rules: [
                PatchRule(
                    bundleID: file.targetBundleID,
                    relativePath: file.localRelativePath,
                    replacementFilename: "Remote v\(file.version) - \(file.fileName)",
                    replacementData: data
                )
            ]
        )
    }

    private static func remoteProjectIDs(fileManager: FileManager = .default) -> Set<UUID> {
        Set(standaloneRemotePatchFiles(fileManager: fileManager).compactMap(remoteProjectID))
    }

    private static func sortedRemoteProjectIDs(fileManager: FileManager = .default) -> [UUID] {
        standaloneRemotePatchFiles(fileManager: fileManager)
            .sorted {
                let leftPublishedAt = $0.publishedAt ?? ""
                let rightPublishedAt = $1.publishedAt ?? ""
                if leftPublishedAt != rightPublishedAt { return leftPublishedAt < rightPublishedAt }
                return $0.name.localizedCaseInsensitiveCompare($1.name) == .orderedAscending
            }
            .compactMap(remoteProjectID)
    }

    private static func standaloneRemotePatchFiles(fileManager: FileManager) -> [RemoteContentFile] {
        RemoteContentLibrary.loadManifest(fileManager: fileManager)?.files.filter { file in
            file.isAvailable
                && remotePatchCategories.contains(file.category.lowercased())
                && !isBuiltInRemoteFile(file)
                && RemoteContentLibrary.localFileURL(for: file, fileManager: fileManager) != nil
        } ?? []
    }

    private static func remoteProjectID(for file: RemoteContentFile) -> UUID? {
        UUID(uuidString: file.id)
    }

    private static func targetPath(for spec: PayloadSpec) -> String {
        if spec.directory == assetIndexerDirectory,
           spec.filenameCandidates.contains(AssetIndexerVariant.pen.filename) {
            return spec.directory + "/" + selectedAssetIndexerVariant.filename
        }
        spec.directory + "/" + (spec.targetFilename ?? spec.filenameCandidates[0])
    }

    private static func effectiveBundleID(for spec: ProjectSpec) -> String {
        spec.id == assetIndexerProjectID ? selectedAssetIndexerVariant.bundleID : spec.bundleID
    }

    private static func normalizedBundleID(_ value: String?) -> String {
        let clean = (value ?? "com.dts.freefireth").trimmingCharacters(in: .whitespacesAndNewlines).lowercased()
        return clean.isEmpty ? "com.dts.freefireth" : clean
    }

    private static func normalizedSlug(_ value: String) -> String {
        value.trimmingCharacters(in: .whitespacesAndNewlines).lowercased()
    }
}
