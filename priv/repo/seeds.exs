# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     SeedRaid.Repo.insert!(%SeedRaid.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

blacklist = [
  413_876_432_226_222_090,
  392_747_598_257_061_888,
  391_274_542_607_237_124,
  390_962_704_116_088_832,
  411_785_159_759_757_312,
  359_632_426_869_325_825,
  363_452_454_001_704_960,
  391_367_624_996_552_708,
  392_406_113_762_410_502,
  393_500_511_191_564_299,
  364_289_848_192_008_192,
  390_269_549_804_519_424,
  292_692_038_254_592_000,
  390_208_191_176_114_179,
  390_156_141_964_820_480,
  362_539_660_322_406_401,
  410_930_027_375_362_049,
  409_719_540_260_274_176,
  390_277_588_691_451_904,
  416_301_124_749_099_019,
  418_150_923_047_665_705,
  417_799_589_215_862_794,
  418_772_824_946_114_591,
  418_772_840_926_674_949
]

blacklist
|> Enum.each(fn id ->
  case SeedRaid.Pin.is_blacklisted?(%{id: id}) do
    false ->
      SeedRaid.Pin.add_to_blacklist(id)

    true ->
      :noop
  end
end)
